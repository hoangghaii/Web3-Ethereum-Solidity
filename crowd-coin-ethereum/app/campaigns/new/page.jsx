'use client';

import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import web3 from '@/ethereum/web3';
import factory from '@/ethereum/factory';
import Heading from '@/components/ui/heading';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import styles from './styles.module.css';
import { useState } from 'react';

const schema = yup
  .object({
    minimumContribition: yup.number().required(),
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

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods.createCampaign(data.minimumContribition).send({
        from: accounts[0],
      });

      toast.success('Campaign created successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Heading title="Create a Campaigns" />

      <form className={styles.form_container} onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="minimumContribition"
          label="Minimum Contribution (wei)"
          register={register('minimumContribition')}
          error={errors.minimumContribition}
          icon="wei"
        />

        <Button title="Create!" type="submit" loading={loading} />
      </form>
    </div>
  );
};

export default CreateCampaign;
