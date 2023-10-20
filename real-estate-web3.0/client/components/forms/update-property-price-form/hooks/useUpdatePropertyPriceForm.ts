import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

const schema = yup
  .object({
    price: yup.number().required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>;

type Props = {
  property: ProperySolType;
};

export const useUpdatePropertyPriceForm = ({ property }: Props) => {
  const { contract } = useContext(AppContext);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: Number(ethers.utils.formatEther(property.price)),
    },
  });

  const { mutateAsync: updatePrice } = useContractWrite(
    contract,
    'updatePrice'
  );

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    try {
      const _price = ethers.utils.parseEther(data.price.toString());

      const txResult = await updatePrice({
        args: [property.productId.toLocaleString(), _price],
      });

      console.info('contract call successs', txResult);

      toast.success('Update property price successfully!');

      reset();
    } catch (err) {
      console.error('contract call failure', err);

      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  });

  return { loading, register, onSubmit };
};
