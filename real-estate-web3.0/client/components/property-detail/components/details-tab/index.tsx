'use client';

import { Avatar, Badge, Flex, Text } from '@radix-ui/themes';
import { ethers } from 'ethers';
import { FC } from 'react';

import { ProperySolType } from '@/types';

import styles from './styles.module.css';

type Props = {
  id: string;
  property: ProperySolType;
};

const DetailsTab: FC<Props> = ({ id, property }: Props) => {
  return (
    <Flex direction="column" gap="4">
      <Flex gap="1" direction="column">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Owner
        </Text>

        <Flex align="center" gap="2">
          <Avatar
            radius="full"
            fallback="A"
            src="https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1964"
          />

          <Text as="span" size="2" weight="medium" className={styles.ellipsis}>
            {property.owner}
          </Text>
        </Flex>
      </Flex>

      <Flex gap="1" direction="column">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Title
        </Text>

        <Text as="p" size="3" weight="medium">
          {property.propertyTitle}
        </Text>
      </Flex>

      <Flex gap="1" direction="column">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Description
        </Text>

        <Text as="p" size="3" weight="medium">
          {property.description}
        </Text>
      </Flex>

      <Flex gap="1" direction="column">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Address
        </Text>

        <Text as="p" size="3" weight="medium">
          {property.propertyAddress}
        </Text>
      </Flex>

      <Flex gap="1" align="center">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Price:
        </Text>

        <Text as="p" size="3" weight="medium">
          {Number(ethers.utils.formatEther(property.price)).toLocaleString()}{' '}
          ETH
        </Text>
      </Flex>

      <Flex gap="1" align="center">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Property ID:
        </Text>

        <Text as="p" size="3" weight="medium">
          #{id}
        </Text>
      </Flex>

      <Flex gap="1" direction="column">
        <Text as="span" size="2" weight="medium" className={styles.title}>
          Category
        </Text>

        <Flex align="center" gap="2">
          <Badge size="2" color="indigo" className={styles.category}>
            {property.category}
          </Badge>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailsTab;
