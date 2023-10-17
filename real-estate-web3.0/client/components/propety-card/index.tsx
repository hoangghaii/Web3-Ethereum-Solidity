'use client';

import { CurrencyDollarIcon, MapIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';
import { FC } from 'react';

import { ProperyType } from '@/types';

import styles from './styles.module.css';

/* eslint-disable @next/next/no-img-element */

type Props = {
  property: ProperyType;
  // eslint-disable-next-line no-unused-vars
  handleViewDetail: (id: string) => void;
};

const PropertyCard: FC<Props> = ({ property, handleViewDetail }: Props) => {
  return (
    <Card size="2" className={styles.card} variant="ghost">
      <Badge variant="solid" color="teal" className={styles.property_price}>
        <Flex align="center" gap="1">
          <CurrencyDollarIcon height="16" width="16" color="white" />

          <Text as="div" size="2">
            {Number(property.price).toLocaleString()} ETH
          </Text>
        </Flex>
      </Badge>

      <Badge variant="solid" color="teal" className={styles.property_location}>
        <Flex align="center" gap="1">
          <MapIcon height="16" width="16" color="white" />

          <Text as="span" size="2">
            {property.propertyAddress}
          </Text>
        </Flex>
      </Badge>

      <AspectRatio ratio={16 / 16}>
        <img
          src={property.image}
          alt="Property image"
          className={styles.property_image}
        />
      </AspectRatio>

      <Flex direction="column" gap="1" className={styles.property_detail}>
        <Heading as="h6" size="5">
          {property.propertyTitle}
        </Heading>

        <Text as="p" size="2" weight="medium">
          {property.description}
        </Text>

        <Dialog.Trigger>
          <Button
            onClick={() => {
              handleViewDetail(property.productId);
            }}
            className={styles.btn}
          >
            View detail
          </Button>
        </Dialog.Trigger>
      </Flex>
    </Card>
  );
};

export default PropertyCard;
