import ToastProvider from '@/providers/toast-provider';
import '@/styles/globals.css';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Real Estate Web3.0',
  description: 'Real Estate Web3.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme accentColor="teal" grayColor="slate">
          {children}
        </Theme>

        <ToastProvider />
      </body>
    </html>
  );
}
