'use client';

import { useRouter } from 'next/navigation';

import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import PlusIcon from '@/components/ui/icon/plus';
import styles from './styles.module.css';

const Campaigns = ({ campaigns }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading title="Open Campaigns" />

        <Button
          title="Create Campaign"
          onClick={() => router.push('/campaigns/new')}
          icon={<PlusIcon />}
        />
      </div>

      <div className={styles.campaigns}>
        {campaigns.map((address) => (
          <Card key={address} title={address} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
