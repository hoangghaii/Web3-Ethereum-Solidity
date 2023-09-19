'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import campaign from '@/ethereum/campaign';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const CampaignDetail = () => {
  const params = useParams();

  const [detail, setDetail] = useState([]);

  const [requestCount, setRequestCount] = useState([]);

  async function getDetailCampaign() {
    try {
      const campaignSolc = campaign(params.id);

      const detail = await Promise.all([
        campaignSolc.methods.getSumary().call(),
        campaignSolc.methods.getRequestsCount().call(),
      ]);

      setDetail(detail[0]);
      setRequestCount(detail[1]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailCampaign();
  }, []);

  console.log(detail);

  return (
    <div className={styles.wrapper}>
      <Heading title="Campaign Details" />

      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.card_container}>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Balance</CardTitle>

                <CardDescription>12.1</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Minimum Contribution</CardTitle>

                <CardDescription>100</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request</CardTitle>

                <CardDescription>{requestCount}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contributions</CardTitle>

                <CardDescription>300</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Button>View Requests</Button>
        </div>

        <div className={styles.section}>
          <h5 className="text-base font-bold">Contribute this campaign!</h5>

          <form className={styles.form_container}>
            <Input
              type="text"
              id="contribute"
              icon="wei"
              className={styles.input}
            />

            <Button
              type="submit"
              variant="default"
              // disabled={loading}
            >
              Create!
              {/* {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />} */}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
