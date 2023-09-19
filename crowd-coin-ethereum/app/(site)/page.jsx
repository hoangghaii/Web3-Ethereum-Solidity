'use client';

import Campaigns from '@/components/campaigns';
import factory from '@/ethereum/factory';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import styles from './styles.module.css';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  async function getCampaigns() {
    try {
      const campaigns = await factory.methods.getDeployedCampaigns().call();

      setCampaigns(campaigns);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try later.');
    }
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className={styles.container}>
      <Campaigns campaigns={campaigns} />
    </div>
  );
}
