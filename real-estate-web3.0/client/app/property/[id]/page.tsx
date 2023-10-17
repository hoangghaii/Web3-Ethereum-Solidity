'use client';

import { useContext } from 'react';

import Loading from '@/app/loading';
import Header from '@/components/common/header';
import PropertyDetail from '@/components/property-detail';
import { AppContext } from '@/providers/app-provider';

export default function PropertyDetailPage() {
  const { isContractLoading } = useContext(AppContext);

  if (isContractLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <main>
        <PropertyDetail />
      </main>
    </>
  );
}
