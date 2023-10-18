import { BigNumber, BigNumberish } from 'ethers';

export type ProperySolType = {
  productId: BigNumberish;
  owner: string;
  price: BigNumberish;
  propertyTitle: string;
  category: string;
  images: string;
  propertyAddress: string;
  description: string;
  reviewers: any[];
  reviews: any[];
};

export type ProperyType = {
  productId: string;
  owner: string;
  price: string;
  propertyTitle: string;
  category: string;
  images: string;
  propertyAddress: string;
  description: string;
  reviewers: any[];
  reviews: any[];
};

export type ReviewSolType = {
  reviewer: string;
  productId: BigNumber;
  rating: BigNumber;
  comment: string;
  likes: BigNumber;
};
