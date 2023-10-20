import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContractWrite } from '@thirdweb-dev/react';
import axios from 'axios';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AppContext } from '@/providers/app-provider';

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

export const useAddPropertyForm = () => {
  const { address, contract } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, setValue, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { mutateAsync: addProperty } = useContractWrite(
    contract,
    'addProperty'
  );

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_JWT}`;

    try {
      let _images = '';

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

          _images = `https://ipfs.io/ipfs/${pinataRes.data.IpfsHash}`;
        }
      }

      const _price = ethers.utils.parseEther(data.price.toString());

      const _owner = address;

      const _propertyTitle = data.propertyTitle;

      const _category = data.category;

      const _propertyAddress = data.propertyAddress;

      const _description = data.description;

      const txResult = await addProperty({
        args: [
          _owner,
          _price,
          _propertyTitle,
          _category,
          _images,
          _propertyAddress,
          _description,
        ],
      });

      console.info('contract call successs', txResult);

      toast.success('Create property successfully!');

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
