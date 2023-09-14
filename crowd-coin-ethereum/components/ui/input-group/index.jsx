'use client';

import { useRouter } from 'next/navigation';

import Plus from '@/components/ui/icon/plus';
import styles from './styles.module.css';

const InputGroup = ({ extentElement }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <input
        type="text"
        id="hs-trailing-button-add-on-with-icon"
        name="hs-trailing-button-add-on-with-icon"
        className={styles.input}
      />
      {extentElement && (
        <button type="button" className={styles.btn_1}>
          Campaigns
        </button>
      )}

      <button
        type="button"
        className={styles.btn_2}
        onClick={() => router.push('/campaigns/new')}
      >
        <Plus />
      </button>
    </div>
  );
};

export default InputGroup;
