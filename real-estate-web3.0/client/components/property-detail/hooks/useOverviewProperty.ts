import { useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import { AppContext } from '@/providers/app-provider';
import { ProperySolType, ReviewSolType } from '@/types';

type Props = {
  id: string;
  property: ProperySolType;
};

export const useOverviewProperty = ({ id, property }: Props) => {
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
          value: property.price,
        },
      });

      console.info('contract call successs', txResult);

      toast.success('Buy property successfully!');
    } catch (error) {
      console.error('contract call failure', error);

      toast.error('Something went wrong, please try later.');
    }
  }

  return {
    handleBuyProperty,
    isLoadingBuyProperty,
    isLoadingReviewComment,
    reviews,
    address,
  };
};
