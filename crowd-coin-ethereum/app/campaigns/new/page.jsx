'use client';

import CreateCampaignForm from '@/components/forms/create-campaign-form';
import { Heading } from '@/components/ui/heading';
import styles from './styles.module.css';

const CreateCampaign = () => {
  return (
    <div className={styles.wrapper}>
      <Heading title="Create a Campaigns" />

      <CreateCampaignForm />
    </div>
  );
};

export default CreateCampaign;
