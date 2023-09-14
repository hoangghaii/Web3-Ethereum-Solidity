'use client';

import Campaigns from '@/components/campaigns';
import factory from '@/ethereum/factory';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  async function getCampaigns() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    setCampaigns(campaigns);
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  useEffect(() => {
    // @ts-ignore
    import('preline');
  }, []);

  return (
    <div className={styles.container}>
      <Campaigns campaigns={campaigns} />
    </div>
  );
}
