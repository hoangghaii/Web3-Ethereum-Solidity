'use client';

import { Avatar, Button, Flex, Heading, Popover, Text } from '@radix-ui/themes';
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

  console.log(addressBalance);

  return (
    <Popover.Content className={styles.container}>
      <Flex direction="column" gap="2">
        <Heading as="h3" size="3">
          {address}
        </Heading>

        <hr className={styles.divider} />

        <Flex direction="column" gap="4">
          <Flex align="center" gap="2">
            <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />

            <Flex direction="column" justify="center" gap="1">
              <Text size="2" weight="medium" className={styles.ellipsis}>
                Address: {address}
              </Text>
              <Text size="2" weight="medium" className={styles.detail}>
                Balance: {addressBalance} Eth
              </Text>
            </Flex>
          </Flex>

          <Flex align="center" gap="2">
            <Avatar
              radius="full"
              fallback="A"
              src="https://images.unsplash.com/photo-1616766098956-c81f12114571?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887"
            />

            <Flex direction="column" justify="center" gap="1">
              <Text size="2" weight="medium" className={styles.ellipsis}>
                Address: {address}
              </Text>
              <Text size="2" weight="medium" className={styles.detail}>
                Balance: {addressBalance} Eth
              </Text>
            </Flex>
          </Flex>

          <Button mt="2">Add Your More Funds</Button>
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
