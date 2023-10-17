'use client';

import { useContext } from 'react';

import Loading from '@/app/loading';
import AllProperties from '@/components/all-properties';
import Header from '@/components/common/header';
import AddPropertyForm from '@/components/forms/add-property-form';
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
        <AddPropertyForm />

        <AllProperties />
      </main>
    </>
  );
}
