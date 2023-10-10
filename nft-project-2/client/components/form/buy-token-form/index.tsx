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
  amount: number;
};

type Role = {
  minter: string;
  burner: string;
};

const schema = yup
  .object({
    amount: yup.number().positive().integer().required(),
  })
  .required();

const BuyTokenForm: FC = () => {
  const { accounts, web3Instance } = useWeb3();

  const { contract, contractAddress } = useContract();

  const [accountBalance, setAccountBalance] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (contract) {
        const amountWei = web3Instance?.utils.toWei(
          data.amount.toString(),
          'wei',
        );
        console.log(amountWei);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getBalance() {
    try {
      if (contract) {
        const decimals = await contract.methods.decimals().call();

        const balance = await contract.methods.balanceOf(accounts[0]).call();

        setAccountBalance(balance / 10 ** decimals);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function listenToTokenTransferEvent() {
    if (contract) {
      contract.events.Transfer({ to: accounts[0] }).on('data', getBalance);
    }
  }

  useEffect(() => {
    if (contract) {
      getBalance();
      listenToTokenTransferEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  if (!contract) return <></>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Heading size="5">Buy Tokens</Heading>

      <Text>
        If you want buy tokens, send Wei to this address:{' '}
        <Text weight="medium">{contractAddress}</Text>
      </Text>

      <Text>
        Your currently have:
        <Text weight="medium">{accountBalance} CAPPU Tokens</Text>
      </Text>

      <Flex align="center" gap="2">
        <Text>Amount to buy:</Text>

        <TextField.Input
          radius="large"
          placeholder="Amount to buy…"
          type="number"
          className={styles.input}
          {...register('amount')}
        />
      </Flex>

      <Button type="submit">Buy more tokens</Button>
    </form>
  );
};

export default BuyTokenForm;
