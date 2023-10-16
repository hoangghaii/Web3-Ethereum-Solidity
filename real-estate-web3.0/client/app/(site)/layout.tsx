'use client';

import { AppProvider } from '@/providers/app-provider';
import { Ethereum, Sepolia } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import styles from './styles.module.css';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet(), walletConnect()]}
      activeChain={Sepolia}
      supportedChains={[Sepolia, Ethereum]}
      clientId={process.env.NEXT_PUBLIC_CLIEND_ID}
    >
      <AppProvider>
        <div className={styles.container_wrapper}>{children}</div>
      </AppProvider>
    </ThirdwebProvider>
  );
}
