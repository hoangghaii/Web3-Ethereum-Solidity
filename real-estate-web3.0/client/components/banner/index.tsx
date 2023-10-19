'use client';

import { BellAlertIcon, HeartIcon } from '@heroicons/react/24/outline';
import {
  AspectRatio,
  Badge,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from '@radix-ui/themes';
import { useContractRead } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { FC, useContext } from 'react';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType } from '@/types';

import styles from './styles.module.css';

const categories = [
  { name: 'Housing', link: '/housing', worth: 4264.2383 },
  { name: 'Office', link: '/office', worth: 4264.2383 },
  { name: 'Framhouse', link: '/framhouse', worth: 4264.2383 },
  { name: 'Retail', link: '/retail', worth: 4264.2383 },
  { name: 'Commercial', link: '/commercial', worth: 4264.2383 },
  { name: 'Country', link: '/country', worth: 4264.2383 },
];

const Banner: FC = () => {
  const { contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getAllProperties');

  const properties: ProperySolType[] = data;

  if (isLoading) {
    return;
  }

  const liveBiddingList = properties.slice(0, 5);

  return (
    <Flex direction="column" gap="8">
      <Flex gap="4" className={styles.container}>
        <Card className={styles.big_image_container}>
          <div className={styles.big_image_box}>
            <AspectRatio ratio={16 / 16}>
              <Image
                src={properties[properties.length - 1].images}
                alt="Property image"
                className={styles.big_image}
                fill
              />
            </AspectRatio>
          </div>

          <Flex direction="column" className={styles.big_image_content}>
            <Text
              as="p"
              size="7"
              weight="medium"
              className={styles.big_image_title}
            >
              {properties[properties.length - 1].propertyTitle}
            </Text>

            <Link size="3" weight="medium">
              Join membership
            </Link>
          </Flex>
        </Card>

        <Grid columns="3" gap="4" className={styles.grid}>
          {categories.map((category) => (
            <div className={styles.category_item} key={category.name}>
              <Card className={styles.category_box}>
                <div className={styles.category_image_box}>
                  <Image
                    src={`/images/banner/${category.name.toLocaleLowerCase()}.jpg`}
                    alt="Property image"
                    className={styles.big_image}
                    fill
                  />
                </div>

                <Flex direction="column" className={styles.category_content}>
                  <Text
                    as="p"
                    size="3"
                    weight="medium"
                    className={styles.category_title}
                  >
                    {category.name}
                  </Text>

                  <Link size="2" weight="medium">
                    {category.worth} ETH
                  </Link>
                </Flex>
              </Card>
            </div>
          ))}
        </Grid>
      </Flex>

      <Flex direction="column" gap="4">
        <Flex align="center" gap="2" ml="2">
          <BellAlertIcon width={26} height={26} className="animate-bounce" />

          <Heading as="h4" size="7">
            Live Bidding
          </Heading>
        </Flex>

        <Flex
          gap="5"
          wrap="wrap"
          justify="center"
          align="center"
          className={styles.live_bidding_container}
        >
          {liveBiddingList.map((item, index) => (
            <div className={styles.live_bidding_item} key={index}>
              <Card className={styles.live_bidding_box}>
                <AspectRatio
                  ratio={16 / 14}
                  className={styles.live_bidding_image_box}
                >
                  <Image
                    src={item.images}
                    alt="Property image"
                    className={styles.big_image}
                    fill
                  />
                </AspectRatio>

                <Flex
                  direction="column"
                  className={styles.live_bidding_content}
                  gap="2"
                >
                  <Text
                    as="p"
                    size="3"
                    weight="medium"
                    className={styles.live_bidding_title}
                  >
                    {item.propertyTitle}
                  </Text>

                  <Badge size="1" className={styles.badge}>
                    {item.category}
                  </Badge>

                  <Flex justify="between" align="center">
                    <Link size="2" weight="medium">
                      {ethers.utils.formatEther(item.price)} ETH
                    </Link>

                    <Flex align="center" gap="1">
                      <HeartIcon width={16} height={16} />

                      <Text as="span" size="2">
                        0
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </div>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Banner;
