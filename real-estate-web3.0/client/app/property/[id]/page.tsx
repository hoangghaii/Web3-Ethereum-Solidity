'use client';

import { useContext } from 'react';

import Loading from '@/app/loading';
import PropertyDetail from '@/components/property-detail';
import { AppContext } from '@/providers/app-provider';

export default function PropertyDetailPage() {
  const { isContractLoading } = useContext(AppContext);

  if (isContractLoading) {
    return <Loading />;
  }

  return <PropertyDetail />;
}
