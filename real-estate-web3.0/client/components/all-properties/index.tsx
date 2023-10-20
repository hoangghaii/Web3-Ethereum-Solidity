'use client';

import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import { FC } from 'react';

import PropertyCard from '@/components/propety-card';
import { categories } from '@/constants';

import { useAllProperties } from './hooks';
import styles from './styles.module.css';

const AllProperties: FC = () => {
  const {
    properties,
    isLoading,
    filterApplied,
    handleViewDetail,
    handleFilterProperties,
  } = useAllProperties();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between">
        <Heading as="h4" size="7" ml="2">
          Explore Products
        </Heading>

        <Flex gap="4">
          {categories.map((category) => (
            <Button
              key={category.name as string}
              variant={filterApplied === category.name ? 'soft' : 'outline'}
              radius="full"
              className={styles.category_button}
              onClick={() => handleFilterProperties(category.name)}
            >
              <Text className={styles.category_name}>{category.name}</Text>
            </Button>
          ))}
        </Flex>
      </Flex>

      <Flex
        gap="9"
        wrap="wrap"
        justify="center"
        align="center"
        className={styles.container}
      >
        {properties.map((property) => {
          return (
            <PropertyCard
              key={property.productId}
              property={property}
              handleViewDetail={() => handleViewDetail(property.productId)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AllProperties;
