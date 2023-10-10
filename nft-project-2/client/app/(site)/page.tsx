'use client';

import BuyTokenForm from '@/components/form/buy-token-form';
import KycForm from '@/components/form/kyc-form';
import { useContract, useWeb3 } from '@/hooks';
import { Flex, Heading, Text } from '@radix-ui/themes';
import styles from './styles.module.css';

export default function Home() {
  const { accounts } = useWeb3();

  const { contract } = useContract();

  const currentAccount = accounts[0];

  if (!currentAccount) return <></>;

  if (!contract) return <Text>Something went error</Text>;

  return (
    <Flex
      direction="column"
      gap="5"
      align="center"
      className={styles.container}
    >
      <Heading size="8">StarDucks Cappucino Token Safe</Heading>

      <Text>Get your Tokens today!</Text>

      <KycForm />

      <BuyTokenForm />
    </Flex>
  );
}
