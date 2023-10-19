'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Tabs,
  Text,
} from '@radix-ui/themes';
import { useContractRead } from '@thirdweb-dev/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, useContext } from 'react';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

import DetailsTab from './components/details-tab';
import ReviewsTab from './components/reviews-tab';
import UsersInterestTab from './components/users-interest-tab';
import styles from './styles.module.css';

const PropertyDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getProperty', [id]);

  if (isLoading) {
    return;
  }

  const property: ProperySolType = data;

  return (
    <Flex className={styles.dialog} gap="5">
      <Flex direction="column" gap="4" className={styles.section_1}>
        <Card>
          <AspectRatio ratio={16 / 16}>
            <Image
              src={property.images}
              alt="Property image"
              className={styles.image}
              fill
            />
          </AspectRatio>
        </Card>

        <Flex gap="5" className={styles.image_preview_list}>
          <Card className={styles.image_preview_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={property.images}
                alt="Property image"
                className={styles.image_preview}
                fill
              />
            </AspectRatio>
          </Card>

          <Card className={styles.image_preview_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={property.images}
                alt="Property image"
                className={styles.image_preview}
                fill
              />
            </AspectRatio>
          </Card>

          <Card className={styles.image_preview_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={property.images}
                alt="Property image"
                className={styles.image_preview}
                fill
              />
            </AspectRatio>
          </Card>
        </Flex>
      </Flex>

      <Flex direction="column" gap="1" className={styles.section_2}>
        <Flex justify="between">
          <Heading as="h4" className={styles.title}>
            {property.propertyTitle}
          </Heading>

          <Flex gap="4">
            <Badge variant="soft" size="2" color="teal">
              5
            </Badge>

            <IconButton className={styles.icon_btn}>
              <EllipsisHorizontalIcon width="28" height="28" />
            </IconButton>
          </Flex>
        </Flex>

        <Text as="p" size="3" className={styles.desc} weight="bold">
          #{id} Portal, Info bellow
        </Text>

        <Flex align="center" gap="8" my="5">
          <Flex direction="column" gap="1">
            <Text size="3" weight="medium" className={styles.category}>
              Category{' '}
              <Text size="2" weight="medium" className={styles.category_sub}>
                10% royalties
              </Text>
            </Text>

            <Flex align="center" gap="3">
              <Avatar
                radius="full"
                fallback="A"
                src="https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1964"
              />

              <Text size="2" weight="medium">
                Only 10% Own
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="1">
            <Text size="2" weight="medium" className={styles.category_sub}>
              Collection
            </Text>

            <Flex align="center" gap="3">
              <Avatar
                radius="full"
                fallback="A"
                src="https://images.unsplash.com/photo-1616766098956-c81f12114571?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887"
              />

              <Text size="2" weight="medium">
                {property.category}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Tabs.Root defaultValue="details">
          <Tabs.List>
            <Tabs.Trigger value="details">Details</Tabs.Trigger>
            <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
            <Tabs.Trigger value="users-interest">Users interest</Tabs.Trigger>
          </Tabs.List>

          <Box pt="3" pb="2">
            <Tabs.Content value="details">
              <DetailsTab id={id} property={property} />
            </Tabs.Content>

            <Tabs.Content value="reviews">
              <ReviewsTab />
            </Tabs.Content>

            <Tabs.Content value="users-interest">
              <UsersInterestTab />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Flex>
  );
};

export default PropertyDetail;
