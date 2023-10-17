import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import ToastProvider from '@/providers/toast-provider';
import '@/styles/globals.css';

import '@radix-ui/themes/styles.css';
import '@smastrom/react-rating/style.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Real Estate Web3.0',
  description: 'Real Estate Web3.0',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme accentColor="teal" grayColor="slate">
          <section className="container_wrapper">{children}</section>
        </Theme>

        <ToastProvider />
      </body>
    </html>
  );
}
