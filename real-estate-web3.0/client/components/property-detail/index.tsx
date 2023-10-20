'use client';

import {
  EllipsisHorizontalIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Popover,
  Tabs,
  Text,
} from '@radix-ui/themes';
import Image from 'next/image';
import { FC } from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

import UpdatePropertyForm from '@/components/forms/update-property-form';
import UpdatePropertyPriceForm from '@/components/forms/update-property-price-form';

import DetailsTab from './components/details-tab';
import OverviewProperty from './components/overviews';
import ReviewsTab from './components/reviews-tab';
import UsersInterestTab from './components/users-interest-tab';
import { usePropertyDetail } from './hooks';
import styles from './styles.module.css';

const PropertyDetail: FC = () => {
  const { isLoading, id, address, property } = usePropertyDetail();

  if (isLoading) {
    return;
  }

  return (
    <Flex className={styles.dialog} gap="5">
      <Flex direction="column" gap="4" className={styles.section_1}>
        <Card>
          <AspectRatio ratio={16 / 16}>
            <Image
              src={property.images ?? '/images/common/no_image_available.jpg'}
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
                src={property.images ?? '/images/common/no_image_available.jpg'}
                alt="Property image"
                className={styles.image_preview}
                fill
              />
            </AspectRatio>
          </Card>

          <Card className={styles.image_preview_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={property.images ?? '/images/common/no_image_available.jpg'}
                alt="Property image"
                className={styles.image_preview}
                fill
              />
            </AspectRatio>
          </Card>

          <Card className={styles.image_preview_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={property.images ?? '/images/common/no_image_available.jpg'}
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
              #{property.productId.toLocaleString()}
            </Badge>

            {property.owner === address && (
              <Popover.Root>
                <Popover.Trigger>
                  <IconButton className={styles.icon_btn}>
                    <EllipsisHorizontalIcon width="28" height="28" />
                  </IconButton>
                </Popover.Trigger>

                <Popover.Content className={styles.popover_content}>
                  <Flex direction="column" gap="3">
                    <Callout.Root>
                      <Callout.Icon>
                        <InformationCircleIcon
                          width={16}
                          height={16}
                          color="teal"
                        />
                      </Callout.Icon>
                      <Callout.Text>This is your property.</Callout.Text>
                    </Callout.Root>

                    <Callout.Root>
                      <Callout.Icon>
                        <InformationCircleIcon
                          width={16}
                          height={16}
                          color="teal"
                        />
                      </Callout.Icon>
                      <Callout.Text>
                        You will need login to update.
                      </Callout.Text>
                    </Callout.Root>

                    <hr className={styles.divider} />

                    <Flex direction="column" align="start" gap="4">
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button>Update property</Button>
                        </Dialog.Trigger>

                        <UpdatePropertyForm property={property} />
                      </Dialog.Root>

                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Button>Update price</Button>
                        </Dialog.Trigger>

                        <UpdatePropertyPriceForm property={property} />
                      </Dialog.Root>
                    </Flex>
                  </Flex>
                </Popover.Content>
              </Popover.Root>
            )}
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
              <Jazzicon
                diameter={40}
                seed={jsNumberForAddress(property.owner)}
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
                fallback=""
                src={`/images/banner/${property.category.toLocaleLowerCase()}.jpg`}
              />

              <Text
                size="2"
                weight="medium"
                style={{
                  textTransform: 'capitalize',
                }}
              >
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
              <ReviewsTab id={id} />
            </Tabs.Content>

            <Tabs.Content value="users-interest">
              <UsersInterestTab />
            </Tabs.Content>
          </Box>
        </Tabs.Root>

        <OverviewProperty id={id} property={property} />
      </Flex>
    </Flex>
  );
};

export default PropertyDetail;
