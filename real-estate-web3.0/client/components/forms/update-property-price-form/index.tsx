'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { FC } from 'react';

import { ProperySolType } from '@/types';

import { useUpdatePropertyPriceForm } from './hooks';
import styles from './styles.module.css';

type Props = {
  property: ProperySolType;
};

const UpdatePropertyPriceForm: FC<Props> = ({ property }: Props) => {
  const { loading, register, onSubmit } = useUpdatePropertyPriceForm({
    property,
  });

  return (
    <Dialog.Content className={styles.card}>
      <Dialog.Title>Update Property Price</Dialog.Title>

      <Dialog.Description size="2">
        Property id:{' '}
        <Text weight="medium">#{property.productId.toLocaleString()}</Text>
      </Dialog.Description>

      <Flex asChild direction="column" gap="4">
        <form onSubmit={onSubmit} className={styles.form}>
          <Flex asChild direction="column" gap="2">
            <label htmlFor="_price">
              <Text as="span" weight="bold">
                Price
              </Text>

              <TextField.Input
                id="_price"
                type="string"
                placeholder="Enter property price"
                {...register('price')}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" align="center" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>

            <Button type="submit">
              {loading && (
                <ArrowPathIcon
                  width="16"
                  height="16"
                  className="animate-spin"
                />
              )}
              Update property price
            </Button>
          </Flex>
        </form>
      </Flex>
    </Dialog.Content>
  );
};

export default UpdatePropertyPriceForm;
