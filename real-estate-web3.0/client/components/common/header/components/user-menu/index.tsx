'use client';

import { Button, Flex, Heading, Link, Popover, Text } from '@radix-ui/themes';
import { useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FC, useEffect, useState } from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

import styles from './styles.module.css';

type Props = {
  address: string;
};

const UserMenu: FC<Props> = ({ address }: Props) => {
  const disconect = useDisconnect();

  const [addressBalance, setAddressBalance] = useState<string>('');

  const getBalance = async () => {
    if (!address) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const balance = await provider.getBalance(address);

    const balanceInEth = ethers.utils.formatEther(balance);

    setAddressBalance(Number(balanceInEth).toFixed(4));
  };

  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Popover.Content className={styles.container}>
      <Flex direction="column" gap="2">
        <Flex direction="column" gap="1">
          <Heading as="h3" size="3" className={styles.ellipsis_header}>
            {address}
          </Heading>

          <Link size="2" weight="medium" className={styles.address_action}>
            Set Display Name
          </Link>
        </Flex>

        <Flex direction="column" gap="4" mt="2">
          <Flex align="center" gap="2" mb="1">
            <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />

            <Flex direction="column" justify="center" gap="1">
              <Text size="2" weight="medium">
                Balance
              </Text>
              <Text size="2" weight="medium" className={styles.detail}>
                {addressBalance} ETH
              </Text>
            </Flex>
          </Flex>

          <Button>Add Your More Funds</Button>
        </Flex>

        <hr className={styles.divider} />

        <Flex direction="column" gap="3" align="start">
          <Button variant="ghost">My Profile</Button>

          <Button variant="ghost">Edit Profile</Button>

          <Button variant="ghost">Manager Funds</Button>

          <Button onClick={disconect} variant="ghost">
            Disconnect
          </Button>
        </Flex>
      </Flex>
    </Popover.Content>
  );
};

export default UserMenu;
