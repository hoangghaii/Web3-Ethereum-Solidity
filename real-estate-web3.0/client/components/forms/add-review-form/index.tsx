'use client';

import * as yup from 'yup';
import {
  ArrowPathIcon,
  ChatBubbleLeftEllipsisIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { Callout, Flex, Text, TextField } from '@radix-ui/themes';
import { Rating } from '@smastrom/react-rating';
import { useContractWrite } from '@thirdweb-dev/react';
import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Button from '@/components/common/button';
import { AppContext } from '@/providers/app-provider';

import styles from './styles.module.css';

const schema = yup
  .object({ rating: yup.number().required(), review: yup.string().required() })
  .required();

type Props = {
  productId: string;
};

const AddReviewForm: FC<Props> = ({ productId }: Props) => {
  const { address, contract } = useContext(AppContext);

  const [rating, setRating] = useState(0);

  const { register, setValue, handleSubmit } = useForm({
    resolver: yupResolver(schema),
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

      toast.success('Create property successfully!');
    } catch (err) {
      console.error('contract call failure', err);

      toast.error('Something went wrong, please try later.');
    }
  });

  return (
    <Flex asChild direction="column" gap="4" mt="8">
      <form onSubmit={onSubmit}>
        <Callout.Root>
          <Callout.Icon>
            <InformationCircleIcon width={16} height={16} color="teal" />
          </Callout.Icon>
          <Callout.Text>You will need login to rating and review.</Callout.Text>
        </Callout.Root>

        <Flex asChild align="center" gap="2">
          <label htmlFor="">
            <Text as="span" size="2" weight="medium">
              Your rating:
            </Text>

            <Rating
              style={{ maxWidth: 140 }}
              value={rating}
              onChange={onChangeRating}
            />
          </label>
        </Flex>

        <Flex asChild align="center" gap="2">
          <label htmlFor="">
            <Text as="span" size="2" weight="medium">
              Your review:
            </Text>

            <Flex gap="4" align="center" className={styles.input_field}>
              <TextField.Root className={styles.input}>
                <TextField.Input
                  placeholder="Enter your review…"
                  {...register('review')}
                />

                <TextField.Slot>
                  {isLoading ? (
                    <ArrowPathIcon
                      width="16"
                      height="16"
                      className="animate-spin"
                    />
                  ) : (
                    <ChatBubbleLeftEllipsisIcon height="16" width="16" />
                  )}
                </TextField.Slot>
              </TextField.Root>
            </Flex>
          </label>
        </Flex>

        <Button type="submit" className={styles.btn} isLoading={isLoading}>
          <Text>Send</Text>
          <PaperAirplaneIcon height="20" width="20" />
        </Button>
      </form>
    </Flex>
  );
};

export default AddReviewForm;
