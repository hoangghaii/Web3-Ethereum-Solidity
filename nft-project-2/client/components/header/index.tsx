'use client';

import { useWeb3 } from '@/hooks';
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import { FC } from 'react';
import styles from './styles.module.css';

const Header: FC = () => {
  const { accounts, connectWalletHandler } = useWeb3();

  const currentAccount = accounts[0];

  return (
    <Box className={styles.box}>
      <Flex align="center" justify="between" className={styles.flex}>
        <Heading size="6">NFT Project 2</Heading>

        {currentAccount ? (
          <Text weight="medium" as="p">
            {currentAccount}
          </Text>
        ) : (
          <Button onClick={connectWalletHandler}>Connect Metamask</Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
