'use client';

import {
  BellIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Heading,
  IconButton,
  Popover,
  Text,
  TextField,
} from '@radix-ui/themes';
import { metamaskWallet, useConnect } from '@thirdweb-dev/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { AppContext } from '@/providers/app-provider';

import UserMenu from './components/user-menu';
import styles from './styles.module.css';

const walletConfig = metamaskWallet();

const Header: FC = () => {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const { address } = useContext(AppContext);

  const connect = useConnect();

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
    <header
      className={styles.container}
      style={{
        backgroundColor: theme === 'dark' ? '#111113' : '#ffffff',
      }}
    >
      <Flex align="center" gap="4">
        <Flex align="center" gap="1" className={styles.logo}>
          <Avatar
            size="4"
            fallback={<span className={styles.avatar}>N</span>}
          />

          <Heading
            as="h6"
            color="teal"
            size="8"
            className={styles.heading}
            onClick={handleRouterLink}
          >
            nuron
          </Heading>
        </Flex>

        <div className={styles.hidden} />

        <Flex gap="3">
          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              Home
            </Link>
          </Text>

          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              About
            </Link>
          </Text>

          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              Explore
            </Link>
          </Text>

          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              Pages
            </Link>
          </Text>

          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              Blog
            </Link>
          </Text>

          <Text weight="medium">
            <Link href="/" className={styles.header_link}>
              Contact
            </Link>
          </Text>
        </Flex>
      </Flex>

      <Flex align="center" gap="4">
        <TextField.Root>
          <TextField.Input placeholder="Search…" className={styles.input} />

          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {address ? (
          <Popover.Root>
            <Popover.Trigger>
              <IconButton
                radius="full"
                variant="ghost"
                className={styles.account_btn}
              >
                <Jazzicon diameter={30} seed={jsNumberForAddress(address)} />
              </IconButton>
            </Popover.Trigger>

            <UserMenu address={address} />
          </Popover.Root>
        ) : (
          <Button onClick={handleConnect} className={styles.connect_btn}>
            Wallet Connect
          </Button>
        )}

        <div className={styles.notify_box}>
          <Badge variant="soft" radius="full" className={styles.nofity_badge}>
            <Text size="1">6</Text>
          </Badge>

          <IconButton variant="soft" radius="full">
            <BellIcon width={20} height={20} />
          </IconButton>
        </div>

        {theme === 'dark' ? (
          <IconButton
            variant="soft"
            radius="full"
            onClick={() => setTheme('light')}
          >
            <SunIcon width={20} height={20} />
          </IconButton>
        ) : (
          <IconButton
            variant="soft"
            radius="full"
            onClick={() => setTheme('dark')}
          >
            <MoonIcon width={20} height={20} />
          </IconButton>
        )}
      </Flex>
    </header>
  );
};

export default Header;
