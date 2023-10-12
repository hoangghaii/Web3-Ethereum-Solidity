'use client';

import '@/styles/globals.css';
import { publicProvider } from '@wagmi/core/providers/public';
import dynamic from 'next/dynamic';
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi';
import styles from './styles.module.css';

const Header = dynamic(() => import('@/components/header'), { ssr: false });

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export default function SideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <WagmiConfig config={config}>
        <section>
          <Header />

          {children}
        </section>
      </WagmiConfig>
    </main>
  );
}
