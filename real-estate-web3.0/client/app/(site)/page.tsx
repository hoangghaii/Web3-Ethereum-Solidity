'use client';

import AllProperties from '@/components/all-properties';
import AddPropertyForm from '@/components/forms/add-property-form';
import { AppContext } from '@/providers/app-provider';
import { Button, Heading, Text } from '@radix-ui/themes';
import { metamaskWallet, useConnect } from '@thirdweb-dev/react';
import { useContext } from 'react';
import Loading from './loading';
import styles from './styles.module.css';

const walletConfig = metamaskWallet();

export default function Home() {
  const { address, isContractLoading } = useContext(AppContext);

  const connect = useConnect();

  async function handleConnect() {
    try {
      await connect(walletConfig);
    } catch (e) {
      console.error('failed to connect', e);
    }
  }

  if (isContractLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.container}>
        <Heading as="h1" color="teal" size="8">
          Real Estate Web3.0
        </Heading>

        {address ? (
          <Text as="p" weight="medium">
            {address}
          </Text>
        ) : (
          <Button onClick={handleConnect} className={styles.connect_btn}>
            Connect to wallet
          </Button>
        )}
      </div>

      <AddPropertyForm />

      <AllProperties />
    </>
  );
}
