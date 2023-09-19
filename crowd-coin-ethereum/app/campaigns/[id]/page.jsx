'use client';

import ContributeForm from '@/components/forms/contribute-form';
import { Heading } from '@/components/ui/heading';
import campaign from '@/ethereum/campaign';
import web3 from '@/ethereum/web3';
import { convertBigInt } from '@/utils';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CampaignSummary from './components/campaign-summary';
import styles from './styles.module.css';

const CampaignDetail = () => {
  const params = useParams();

  const [detail, setDetail] = useState(null);

  async function getDetailCampaign() {
    try {
      const summary = await campaign(params.id).methods.getSummary().call();

      setDetail({
        address: params.id,
        minimumContribution: convertBigInt(summary[0]),
        balance: web3.utils.fromWei(summary[1], 'ether'),
        requestsCount: convertBigInt(summary[2]),
        approversCount: convertBigInt(summary[3]),
        manager: summary[4],
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailCampaign();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Heading title="Campaign Details" />

      {detail && (
        <>
          <div className={styles.container}>
            <CampaignSummary detail={detail} />

            <ContributeForm
              address={detail.address}
              minimumContribution={detail.minimumContribution}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignDetail;
