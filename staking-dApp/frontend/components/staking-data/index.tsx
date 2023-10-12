import { FC } from 'react';
import styles from './styles.module.css';

const StakingData: FC = () => {
  return (
    <section className={styles.staking_data_container}>
      <section className={styles.staking_data}>
        <span>Total Staked Tokens</span>

        <span className={styles.staking_data_value}>$9,237,907</span>
      </section>

      <section className={styles.staking_data}>
        <span>Total Renewal Paid</span>

        <span className={styles.staking_data_value}>$1,632,651</span>
      </section>

      <section className={styles.staking_data}>
        <span>Stakers</span>

        <span className={styles.staking_data_value}>92,783</span>
      </section>
    </section>
  );
};

export default StakingData;
