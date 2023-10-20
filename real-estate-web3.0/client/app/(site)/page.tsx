'use client';

import { useContext } from 'react';

import Loading from '@/app/loading';
import AllProperties from '@/components/all-properties';
import Banner from '@/components/banner';
import TopCollection from '@/components/top-collection';
import TopSeller from '@/components/top-seller';
import { AppContext } from '@/providers/app-provider';

export default function Home() {
  const { isContractLoading } = useContext(AppContext);

  if (isContractLoading) {
    return <Loading />;
  }

  return (
    <>
      <Banner />

      <AllProperties />

      <TopSeller />

      <TopCollection />
    </>
  );
}
