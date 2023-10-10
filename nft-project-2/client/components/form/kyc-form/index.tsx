'use client';

import { useContract, useWeb3 } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './styles.module.css';

type FormData = {
  address: string;
  role: string;
};

type Role = {
  minter: string;
  burner: string;
};

const schema = yup
  .object({
    address: yup.string().required(),
    role: yup.string().required(),
  })
  .required();

const KycForm: FC = () => {
  const { accounts } = useWeb3();

  const { contract } = useContract();

  const [role, setRole] = useState<Role | null>(null);

  async function getRoles() {
    try {
      if (contract) {
        const burnerRole = await contract.methods.BURNER_ROLE().call();

        const minterRole = await contract.methods.MINTER_ROLE().call();

        setRole({
          burner: burnerRole,
          minter: minterRole,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (contract) {
        await contract?.methods.grantRole(data.role, data.address).send({
          from: accounts[0],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (contract) {
      getRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  if (!contract) return <></>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Heading size="5">KYC Whitelisting</Heading>

      <Flex align="center" gap="2">
        <Text>Address to allow:</Text>

        <TextField.Input
          radius="large"
          placeholder="Address to allow…"
          className={styles.input}
          {...register('address')}
        />

        {role && (
          <Select.Root
            onValueChange={(value) => {
              setValue('role', value);
            }}
          >
            <Select.Trigger placeholder="Role" />

            <Select.Content position="popper">
              <Select.Item value={role.minter}>Minter Role</Select.Item>
              <Select.Item value={role.burner}>Burner Role</Select.Item>
            </Select.Content>
          </Select.Root>
        )}
      </Flex>

      <Button type="submit">Add to WhiteList</Button>
    </form>
  );
};

export default KycForm;
