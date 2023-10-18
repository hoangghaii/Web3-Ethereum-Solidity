'use client';

import * as yup from 'yup';
import {
  ArrowPathIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Button as RadixButton,
  Text,
  TextArea,
} from '@radix-ui/themes';
import { Rating } from '@smastrom/react-rating';
import { useContractWrite } from '@thirdweb-dev/react';
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { AppContext } from '@/providers/app-provider';

import styles from './styles.module.css';

const schema = yup
  .object({
    rating: yup.number(),
    review: yup.string().required(),
  })
  .required();

type Props = {
  productId: string;
};

const AddReviewForm: FC<Props> = ({ productId }: Props) => {
  const { address, contract } = useContext(AppContext);

  const [rating, setRating] = useState(0);

  const { register, setValue, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 0,
      review: '',
    },
  });

  const { mutateAsync: addReview, isLoading } = useContractWrite(
    contract,
    'addReview'
  );

  function onChangeRating(value: number) {
    setRating(value);
    setValue('rating', value);
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { rating, review } = data;

      const txResult = await addReview({
        args: [productId, rating, review, address],
      });

      console.info('contract call successs', txResult);

      toast.success('Add review successfully!');
    } catch (err) {
      console.error('contract call failure', err);

      toast.error('Something went wrong, please try later.');
    }
  });

  return (
    <Dialog.Content>
      <Dialog.Title>Give Review</Dialog.Title>

      <Dialog.Description size="3" mb="4">
        Kindly provide your review for better user experience.
      </Dialog.Description>

      <Flex asChild direction="column" gap="4">
        <form onSubmit={onSubmit}>
          <Callout.Root>
            <Callout.Icon>
              <InformationCircleIcon width={16} height={16} color="teal" />
            </Callout.Icon>
            <Callout.Text>
              You will need login to add rating and review.
            </Callout.Text>
          </Callout.Root>

          <Flex asChild direction="column" align="start" gap="2">
            <label htmlFor="">
              <Text as="span" size="3" weight="medium">
                Your review:
              </Text>

              <TextArea
                size="3"
                placeholder="Your review…"
                className={styles.textarea}
                {...register('review')}
              />
            </label>
          </Flex>

          <Flex asChild direction="column" align="start" gap="2">
            <label htmlFor="">
              <Text as="span" size="3" weight="medium">
                Your rating:
              </Text>

              <Rating
                style={{ maxWidth: 140 }}
                value={rating}
                onChange={onChangeRating}
              />
            </label>
          </Flex>

          <Flex gap="3" justify="end">
            <Dialog.Close>
              <RadixButton variant="soft" color="gray" onClick={() => reset()}>
                Cancel
              </RadixButton>
            </Dialog.Close>

            {/* <Dialog.Close> */}
            <Button type="submit" className={styles.btn}>
              {isLoading && (
                <ArrowPathIcon
                  width="16"
                  height="16"
                  className="animate-spin"
                />
              )}
              Add review
            </Button>
            {/* </Dialog.Close> */}
          </Flex>
        </form>
      </Flex>
    </Dialog.Content>
  );
};

export default AddReviewForm;
