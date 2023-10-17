'use client';

import { Ethereum, Sepolia } from '@thirdweb-dev/chains';
import {
  coinbaseWallet,
  metamaskWallet,
  ThirdwebProvider,
  walletConnect,
} from '@thirdweb-dev/react';
import { ReactNode } from 'react';

import { AppProvider } from '@/providers/app-provider';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={Sepolia}
      supportedChains={[Sepolia, Ethereum]}
      clientId={process.env.NEXT_PUBLIC_CLIEND_ID}
    >
      <AppProvider>{children}</AppProvider>
    </ThirdwebProvider>
  );
}
