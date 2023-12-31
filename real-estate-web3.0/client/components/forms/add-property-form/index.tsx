'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import { FC } from 'react';

import { bannerCategories } from '@/constants';

import { useAddPropertyForm } from './hooks';
import styles from './styles.module.css';

const AddPropertyForm: FC = () => {
  const { loading, register, setValue, onSubmit } = useAddPropertyForm();

  return (
    <Card className={styles.card}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Heading as="h3" className={styles.title}>
          Create Property
        </Heading>

        <Flex direction="column" gap="4">
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

              <TextField.Input
                id="_images"
                type="file"
                accept=".png, .jpg, .jpeg"
                {...register('images')}
                className={styles.form_image_input}
              />
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
        </Flex>

        <Button type="submit" className={styles.btn} color="teal">
          {loading && (
            <ArrowPathIcon width="16" height="16" className="animate-spin" />
          )}
          Create property
        </Button>
      </form>
    </Card>
  );
};

export default AddPropertyForm;
