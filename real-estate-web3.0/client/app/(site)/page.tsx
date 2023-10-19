'use client';

import { Flex } from '@radix-ui/themes';
import { useContext } from 'react';

import Loading from '@/app/loading';
import AllProperties from '@/components/all-properties';
import Banner from '@/components/banner';
import Header from '@/components/common/header';
import { AppContext } from '@/providers/app-provider';

export default function Home() {
  const { isContractLoading } = useContext(AppContext);

  if (isContractLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <main>
        <Flex direction="column" gap="8">
          <Banner />

          <AllProperties />
        </Flex>
      </main>
    </>
  );
}
