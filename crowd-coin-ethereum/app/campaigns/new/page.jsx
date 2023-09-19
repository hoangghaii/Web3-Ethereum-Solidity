'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import factory from '@/ethereum/factory';
import web3 from '@/ethereum/web3';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

const schema = yup
  .object({
    minimumContribution: yup.number().required(),
  })
  .required();

const CreateCampaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function onSubmit({ minimumContribution }) {
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      const minimum = web3.utils.toWei(minimumContribution, 'ether');

      const gasEstimate = await factory.methods
        .createCampaign(minimum)
        .estimateGas({ from: accounts[0] });

      await factory.methods.createCampaign(minimum).send({
        from: accounts[0],
        gas: gasEstimate.toString(),
        // gasLimit: '0x5028',
      });

      toast.success('Campaign created successfully!');

      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Heading title="Create a Campaigns" />

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="minimumContribution">
            Minimum Contribution (wei)
          </Label>

          <Input
            type="text"
            id="minimumContribution"
            register={register('minimumContribution')}
            error={errors.minimumContribution}
            className={cn([errors.minimumContribution && styles.input_error])}
            icon="wei"
          />
        </div>

        <Button type="submit" variant="default" disabled={loading}>
          Create!
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </div>
  );
};

export default CreateCampaign;
