'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const Campaigns = ({ campaigns }) => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Heading title="Open Campaigns" />

        <Button onClick={() => router.push('/campaigns/new')}>
          Create
          <Plus />
        </Button>
      </div>

      <div className={styles.campaigns}>
        {campaigns.map((address) => (
          <Card key={address}>
            <CardHeader>
              <CardTitle>{address}</CardTitle>
            </CardHeader>

            <CardContent>
              <Link
                href="/campaigns/[id]"
                as={`/campaigns/${address}`}
                className={styles.link}
              >
                View Campaign
                <ChevronRight />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
