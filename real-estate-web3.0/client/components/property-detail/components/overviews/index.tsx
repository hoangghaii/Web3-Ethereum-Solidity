'use client';

import { ArrowPathIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import { Avatar, Button, Card, Dialog, Flex, Text } from '@radix-ui/themes';
import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { FC, useContext } from 'react';
import { toast } from 'react-hot-toast';

import AddReviewForm from '@/components/forms/add-review-form';
import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ReviewSolType } from '@/types';

import styles from './styles.module.css';

type Props = {
  id: string;
  property: ProperySolType;
};

const OverviewProperty: FC<Props> = ({ id, property }: Props) => {
  const { address, contract } = useContext(AppContext);

  // Contract read function
  const { mutateAsync: buyProperty, isLoading: isLoadingBuyProperty } =
    useContractWrite(contract, 'buyProperty');

  const { data: reviewComment, isLoading: isLoadingReviewComment } =
    useContractRead(contract, 'getProductReviews', [id]);

  const reviews: ReviewSolType[] = reviewComment;

  async function handleBuyProperty() {
    try {
      const txResult = await buyProperty({
        args: [id, address],
        overrides: {
          value: Number(
            ethers.utils.formatEther(property.price)
          ).toLocaleString(),
        },
      });

      console.info('contract call successs', txResult);

      toast.success('Create property successfully!');
    } catch (error) {
      console.error('contract call failure', error);

      toast.error('Something went wrong, please try later.');
    }
  }

  return (
    <Card className={styles.card}>
      <Flex direction="column">
        <Flex justify="between">
          <Flex direction="column" gap="2">
            <Text as="span" size="3" weight="medium">
              Recent Comment
            </Text>

            <Flex align="center" gap="3">
              {!isLoadingReviewComment && reviews.length > 0 && (
                <>
                  <Avatar
                    radius="full"
                    fallback="A"
                    src="https://images.unsplash.com/photo-1616766098956-c81f12114571?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1887"
                  />

                  <Flex direction="column" justify="center" gap="1">
                    <Text
                      size="2"
                      weight="medium"
                      className={`${styles.detail} ${styles.ellipsis}`}
                    >
                      {reviews[reviews.length - 1].reviewer}
                    </Text>

                    <Text size="2" weight="medium" className={styles.detail}>
                      {reviews[reviews.length - 1].comment}
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="span" size="3" weight="medium">
              Property Stats
            </Text>

            <Flex direction="column" gap="1">
              <Text size="1" weight="medium" className={styles.detail}>
                Price:{' '}
                {Number(
                  ethers.utils.formatEther(property.price)
                ).toLocaleString()}{' '}
                ETH
              </Text>

              <Text size="1" weight="medium" className={styles.detail}>
                Comment: 4
              </Text>

              <Text size="1" weight="medium" className={styles.detail}>
                Interest: 10
              </Text>

              <Text size="1" weight="medium" className={styles.detail}>
                Time Left: 00:06:30:53
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" gap="4" mt="4">
        {property.owner === address ? (
          <Button type="submit" className={styles.btn} disabled>
            <Text>You can not buy your owned property</Text>
          </Button>
        ) : (
          <Button
            type="submit"
            className={styles.btn}
            onClick={handleBuyProperty}
          >
            {isLoadingBuyProperty && (
              <ArrowPathIcon width="16" height="16" className="animate-spin" />
            )}

            <Text>Buy Property</Text>

            <HomeModernIcon height="20" width="20" />
          </Button>
        )}

        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Add Reivew</Button>
          </Dialog.Trigger>

          <AddReviewForm productId={id} />
        </Dialog.Root>
      </Flex>
    </Card>
  );
};

export default OverviewProperty;
