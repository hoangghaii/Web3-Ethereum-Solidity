export type AssetContract = {
  positionId: BigInt;
  walletAddress: string;
  createdDate: BigInt;
  unlockDate: BigInt;
  percentInterest: BigInt;
  weiStaked: BigInt;
  weiInterest: BigInt;
  open: boolean;
};

export type Asset = {
  positionId: number;
  walletAddress: string;
  daysRemaining: number;
  percentInterest: number;
  etherStaked: string;
  etherInterest: string;
  open: boolean;
};
