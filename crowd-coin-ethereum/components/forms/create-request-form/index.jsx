'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { cn } from '@/lib/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import styles from './styles.module.css';

const schema = yup
  .object({
    description: yup.string().required('This field is required'),
    amount: yup
      .number()
      .typeError('Please enter a valid number')
      .required('This field is required'),
    recipient: yup.string().required('This field is required'),
  })
  .required();

const CreateRequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onSubmit({ description, amount, recipient }) {
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      toast.success('Campaign created successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form_item}>
        <Label htmlFor="description">Description</Label>

        <Input
          type="text"
          id="description"
          register={register('description')}
          error={errors.description}
          inputClassName={cn(errors.description && styles.input_error)}
        />
      </div>

      <div className={styles.form_item}>
        <Label htmlFor="amount">Amount in Either</Label>

        <Input
          type="text"
          id="amount"
          register={register('amount')}
          error={errors.amount}
          inputClassName={cn(errors.amount && styles.input_error)}
          icon="either"
        />
      </div>

      <div className={styles.form_item}>
        <Label htmlFor="recipient">Recipient</Label>

        <Input
          type="text"
          id="recipient"
          register={register('recipient')}
          error={errors.recipient}
          inputClassName={cn(errors.recipient && styles.input_error)}
        />
      </div>

      <Button type="submit" variant="default" disabled={loading}>
        Create!
        {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
};

export default CreateRequestForm;
