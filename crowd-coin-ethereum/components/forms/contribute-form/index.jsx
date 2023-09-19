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

const ContributeForm = ({ address, minimumContribution }) => {
  const router = useRouter();

  const schema = yup
    .object({
      contribute: yup
        .number()
        .required('This field is required')
        .min(
          web3.utils.fromWei(minimumContribution, 'ether'),
          `Minimum contribution is ${web3.utils.fromWei(
            minimumContribution,
            'ether',
          )} ether`,
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit({ contribute }) {
    setLoading(true);

    try {
      const campaignSolc = campaign(address);

      const accounts = await web3.eth.getAccounts();

      const contributeValue = web3.utils.toWei(contribute, 'ether');

      await campaignSolc.methods.contribute().send({
        from: accounts[0],
        value: contributeValue,
      });

      toast.success('Contribute campaign successfully!');

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.section}>
      <h5 className="text-base font-bold">Contribute this campaign!</h5>

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="contribute">Amount to Contribute</Label>

        <Input
          type="text"
          id="contribute"
          register={register('contribute')}
          error={errors.contribute}
          className={styles.input}
          inputClassName={cn(errors.contribute && styles.input_error)}
          icon="ether"
        />

        <Button type="submit" variant="default" disabled={loading}>
          Contribute!
          {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </form>
    </div>
  );
};

export default ContributeForm;
