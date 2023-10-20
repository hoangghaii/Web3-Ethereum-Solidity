'use client';

import {
  ArrowPathIcon,
  HeartIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

import { useReviewsTab } from '../../hooks';
import styles from './styles.module.css';

type Props = {
  id: string;
};

const ReviewsTab: FC<Props> = ({ id }: Props) => {
  const { handleLikeReview, address, reviews, isLoading, isLoadingLikeReview } =
    useReviewsTab({ id });

  if (isLoading) {
    return;
  }

  if (!reviews || reviews.length === 0) {
    return <Text weight="medium">No reviews</Text>;
  }

  return (
    <Flex direction="column">
      {reviews.map((review) => (
        <Flex
          key={review.reviewIndex.toString()}
          align="start"
          justify="between"
        >
          <Flex align="center" gap="4">
            <Jazzicon
              diameter={40}
              seed={jsNumberForAddress(review.reviewer)}
            />

            <Flex direction="column" gap="1">
              <Text
                size="2"
                weight="medium"
                className={styles.review_reviewer_address}
              >
                {review.reviewer}
              </Text>

              <Flex direction="column">
                <Text size="2" weight="medium">
                  Review: {review.comment}
                </Text>

                <Flex align="center">
                  <Text size="2" weight="medium">
                    Rating: {review.rating.toString()}
                  </Text>

                  <StarIcon width={16} height={16} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Flex align="center" gap="3" mr="5">
            <IconButton
              variant="ghost"
              radius="full"
              onClick={() => {
                review.reviewer !== address &&
                  handleLikeReview(review.reviewIndex.toString());
              }}
            >
              <HeartIcon width={16} height={20} />
            </IconButton>

            {isLoadingLikeReview ? (
              <ArrowPathIcon width={14} height={14} className="animate-spin" />
            ) : (
              <Text
                size="2"
                weight="medium"
                style={{
                  width: '14px',
                }}
              >
                {review.likes.toString()}
              </Text>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default ReviewsTab;
