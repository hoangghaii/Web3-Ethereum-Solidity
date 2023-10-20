import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContractWrite } from '@thirdweb-dev/react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

const schema = yup
  .object({
    price: yup.number().required(),
    propertyTitle: yup.string().required(),
    category: yup.string().required(),
    images: yup.mixed().required('File is required'),
    propertyAddress: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

type Props = {
  property: ProperySolType;
};

export const useUpdatePropertyForm = ({ property }: Props) => {
  const { contract } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, setValue, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: Number(ethers.utils.formatEther(property.price)),
      propertyTitle: property.propertyTitle,
      category: property.category,
      images: property.images,
      propertyAddress: property.propertyAddress,
      description: property.description,
    },
  });

  const { mutateAsync: updateProperty } = useContractWrite(
    contract,
    'updateProperty'
  );

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`;

    try {
      const _propertyTitle = data.propertyTitle;

      const _category = data.category;

      const _propertyAddress = data.propertyAddress;

      const _description = data.description;

      let txResult = null;

      if (data.images instanceof FileList) {
        const files = data.images as FileList;

        if (files.length > 0) {
          const file = files[0];

          const formData = new FormData();

          formData.append('file', file);

          const metadata = JSON.stringify({
            name: file.name.split('.')[0],
          });
          formData.append('pinataMetadata', metadata);

          const options = JSON.stringify({
            cidVersion: 0,
          });

          formData.append('pinataOptions', options);

          const pinataRes = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
              headers: {
                'Content-Type': `multipart/form-data; boundary=${
                  (formData as any)._boundary
                }`,
                Authorization: JWT,
              },
            }
          );

          const _images = `https://ipfs.io/ipfs/${pinataRes.data.IpfsHash}`;

          txResult = await updateProperty({
            args: [
              property.productId.toLocaleString(),
              _propertyTitle,
              _category,
              _images,
              _propertyAddress,
              _description,
            ],
          });
        }
      } else {
        const _images = data.images;

        txResult = await updateProperty({
          args: [
            property.productId.toLocaleString(),
            _propertyTitle,
            _category,
            _images,
            _propertyAddress,
            _description,
          ],
        });
      }

      console.info('contract call successs', txResult);

      toast.success('Update property successfully!');

      reset();
    } catch (err) {
      console.error('contract call failure', err);

      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  });

  return { loading, register, setValue, onSubmit };
};
