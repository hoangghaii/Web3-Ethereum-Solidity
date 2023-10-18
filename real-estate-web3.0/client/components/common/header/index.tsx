'use client';

import { Button, Heading, Text } from '@radix-ui/themes';
import {
  metamaskWallet,
  useConnect,
  useDisconnect,
  useSigner,
} from '@thirdweb-dev/react';
import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';

import { AppContext } from '@/providers/app-provider';

import styles from './styles.module.css';

const walletConfig = metamaskWallet();

const Header: FC = () => {
  const router = useRouter();

  const { address } = useContext(AppContext);

  const connect = useConnect();

  const disconect = useDisconnect();

  const signer = useSigner();

  async function handleConnect() {
    try {
      await connect(walletConfig);
    } catch (e) {
      console.error('failed to connect', e);
    }
  }

  function handleRouterLink() {
    router.push('/');
  }

  return (
    <header className={styles.container}>
      <Heading
        as="h1"
        color="teal"
        size="8"
        className={styles.heading}
        onClick={handleRouterLink}
      >
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
    </header>
  );
};

export default Header;
