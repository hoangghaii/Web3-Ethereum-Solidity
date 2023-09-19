import CreateRequestForm from '@/components/forms/create-request-form';
import { Heading } from '@/components/ui/heading';
import styles from './styles.module.css';

const CreateCampaignRequest = () => {
  return (
    <div className={styles.wrapper}>
      <Heading title="Create a Request" />

      <CreateRequestForm />
    </div>
  );
};

export default CreateCampaignRequest;
