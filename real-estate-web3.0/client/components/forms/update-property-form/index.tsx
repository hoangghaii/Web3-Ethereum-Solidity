'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Button,
  Card,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import Image from 'next/image';
import { FC } from 'react';

import { bannerCategories } from '@/constants';
import { ProperySolType } from '@/types';

import { useUpdatePropertyForm } from './hooks';
import styles from './styles.module.css';

type Props = {
  property: ProperySolType;
};

const UpdatePropertyForm: FC<Props> = ({ property }: Props) => {
  const { loading, setValue, register, onSubmit } = useUpdatePropertyForm({
    property,
  });

  return (
    <Dialog.Content className={styles.card}>
      <Dialog.Title>Update Property</Dialog.Title>

      <Dialog.Description size="2">
        Property id:{' '}
        <Text weight="medium">#{property.productId.toLocaleString()}</Text>
      </Dialog.Description>

      <Flex asChild direction="column" gap="4">
        <form onSubmit={onSubmit} className={styles.form}>
          <Flex asChild direction="column" gap="2">
            <label htmlFor="_propertyTitle">
              <Text as="span" weight="bold">
                Title
              </Text>

              <TextField.Input
                id="_propertyTitle"
                placeholder="Enter property title"
                {...register('propertyTitle')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_category">
              <Text as="span" weight="bold">
                Category
              </Text>

              <Select.Root
                onValueChange={(value) => setValue('category', value)}
                {...register('category')}
              >
                <Select.Trigger placeholder="Pick a category" />
                <Select.Content>
                  <Select.Group id="_category">
                    {bannerCategories.map((category) => (
                      <Select.Item
                        key={category.name as string}
                        value={category.name as string}
                      >
                        <Text className={styles.category_item}>
                          {category.name}
                        </Text>
                      </Select.Item>
                    ))}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

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
                disabled
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_description">
              <Text as="span" weight="bold">
                Description
              </Text>

              <TextField.Input
                id="_description"
                placeholder="Enter property description"
                {...register('description')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_images">
              <Text as="span" weight="bold">
                Image
              </Text>

              <Flex gap="4" align="start">
                <TextField.Input
                  id="_images"
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  {...register('images')}
                  className={styles.form_image_input}
                />

                {property.images && (
                  <Card className={styles.property_image_card}>
                    <AspectRatio ratio={16 / 16}>
                      <Image
                        src={property.images}
                        alt="Property Image"
                        fill
                        className={styles.property_image}
                      />
                    </AspectRatio>
                  </Card>
                )}
              </Flex>
            </label>
          </Flex>

          <Flex asChild direction="column" gap="2">
            <label htmlFor="_propertyAddress">
              <Text as="span" weight="bold">
                Address
              </Text>

              <TextField.Input
                id="_propertyAddress"
                placeholder="Enter property address"
                {...register('propertyAddress')}
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
              Update property
            </Button>
          </Flex>
        </form>
      </Flex>
    </Dialog.Content>
  );
};

export default UpdatePropertyForm;
