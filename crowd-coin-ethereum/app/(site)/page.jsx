'use client';

import Campaigns from '@/components/campaigns';
import { useEth } from '@/contexts/EthContext';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from './styles.module.css';
import { cn } from '@/lib/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  const [value, setValue] = useState();

  const {
    state: { accounts, campaignFactoryContract, simpleStorageContract },
  } = useEth();

  async function read() {
    if (!simpleStorageContract) return;

    try {
      const value = await simpleStorageContract.methods
        .read()
        .call({ from: accounts[0] });

      setValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCampaigns() {
    if (!campaignFactoryContract) return;

    try {
      const campaigns = await campaignFactoryContract.methods
        .getDeployedCampaigns()
        .call();

      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try later.');
    }
  }

  useEffect(() => {
    getCampaigns();
  }, [campaignFactoryContract]);

  const schema = yup
    .object({
      contribute: yup.number().required('This field is required'),
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
    if (!simpleStorageContract) return;

    setLoading(true);

    try {
      const gas = await simpleStorageContract.methods
        .write(contribute)
        .estimateGas();

      await simpleStorageContract.methods.write(contribute).send({
        from: accounts[0],
        gas: gas,
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
    <div className={styles.container}>
      <h5 className="text-base font-bold">{value}</h5>

      <Button onClick={read}>Read!</Button>

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
        </Button>
      </form>
      <Campaigns campaigns={campaigns} />
    </div>
  );
}
