import dynamic from 'next/dynamic';
import { FC } from 'react';
import StakingData from '../staking-data';
import styles from './styles.module.css';

const Staking = dynamic(() => import('../staking'), { ssr: false });

const Main: FC = () => {
  return (
    <section className={styles.container}>
      <Staking />

      <StakingData />
    </section>
  );
};

export default Main;
