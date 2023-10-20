'use client';

import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Avatar, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import styles from './styles.module.css';

const Footer: FC = () => {
  const router = useRouter();

  function handleRouterLink() {
    router.push('/');
  }

  return (
    <Flex direction="column" gap="5" className={styles.container}>
      <Flex align="start" justify="between">
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

        <Grid columns="3" gap="7" className={styles.grid}>
          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              SELL A HOME
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Request an offer</Text>
              <Text>Pricing</Text>
              <Text>Reviews</Text>
              <Text>Stories</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              BUY, SELL & RENT
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Buy and sell properties</Text>
              <Text>Rent home</Text>
              <Text>Builder trade-up</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              ABOUT
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Company</Text>
              <Text>How it works</Text>
              <Text>Contact</Text>
              <Text>Investors</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              BUY A HOME
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Buy</Text>
              <Text>Finance</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              TERMS & POLICIES
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Trust & Safely</Text>
              <Text>Terms of Service</Text>
              <Text>Privacy Policy</Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="4">
            <Heading as="h6" size="4">
              RESOURCE
            </Heading>

            <Flex direction="column" gap="2">
              <Text>Blog</Text>
              <Text>Guides</Text>
              <Text>FAQ</Text>
              <Text>Help Center</Text>
            </Flex>
          </Flex>
        </Grid>
      </Flex>

      <hr className={styles.diviver} />

      <Flex align="center" justify="between" className={styles.section}>
        <Text>© 2023 Nuxon. All rights reserved</Text>

        <Flex gap="5">
          <InstagramLogoIcon width={20} height={20} />

          <TwitterLogoIcon width={20} height={20} />

          <LinkedInLogoIcon width={20} height={20} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
