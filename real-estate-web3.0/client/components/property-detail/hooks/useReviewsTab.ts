import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { useContext } from 'react';

import { AppContext } from '@/providers/app-provider';
import { ReviewSolType } from '@/types';

type Props = {
  id: string;
};

export const useReviewsTab = ({ id }: Props) => {
  const { address, contract } = useContext(AppContext);

  const { data, isLoading } = useContractRead(contract, 'getProductReviews', [
    id,
  ]);

  const { mutateAsync: likeReview, isLoading: isLoadingLikeReview } =
    useContractWrite(contract, 'likeReview');

  async function handleLikeReview(reviewIndex: string) {
    try {
      const txResult = await likeReview({ args: [id, reviewIndex, address] });

      console.info('contract call successs', txResult);
    } catch (error) {
      console.error('contract call failure', error);
    }
  }

  const reviews: ReviewSolType[] = data;

  return {
    handleLikeReview,
    address,
    reviews,
    isLoading,
    isLoadingLikeReview,
  };
};
