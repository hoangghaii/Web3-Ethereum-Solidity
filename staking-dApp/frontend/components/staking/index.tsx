'use client';

import StakingJson from '@/contracts/Staking.json';
import {
  getAccount,
  getNetwork,
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Stake from './components/stake';
import Unstake from './components/unstake';
import styles from './styles.module.css';
import LockedStaking from './components/locked-staking';

const Staking: FC = () => {
  const { address: accountAddress } = getAccount();

  const { chain } = getNetwork();

  const networkId = chain?.id as number;

  const networks = StakingJson.networks as any;

  const address = networks[networkId]?.address;

  const stakingAbi = StakingJson.abi as any;

  const stakingContract = {
    address,
    abi: stakingAbi,
  };

  const [stakingTab, setStakingTab] = useState(true);

  const [unstakingTab, setUnstakingTab] = useState(false);

  async function switchToUnstake() {
    if (!unstakingTab) {
      setUnstakingTab(true);
      setStakingTab(false);
    }
  }

  function switchToStake() {
    if (!stakingTab) {
      setStakingTab(true);
      setUnstakingTab(false);
    }
  }

  return (
    <section className={styles.staking_container}>
      <section className={styles.staking_container_section}>
        <section className={styles.stake_unstake_tab}>
          <section
            className={`${
              stakingTab
                ? `${styles.staking_type_section} ${styles.staking_type}`
                : styles.staking_type_section
            }`}
            id="stake"
            onClick={switchToStake}
          >
            Stake
          </section>

          <section
            className={`${
              unstakingTab
                ? `${styles.staking_type_section} ${styles.staking_type}`
                : styles.staking_type_section
            }`}
            id="unstake"
            onClick={switchToUnstake}
          >
            Unstake
          </section>
        </section>

        <section className={styles.staking_section}>
          <span className={styles.apy}>7% APY</span>

          {stakingTab ? (
            <Stake
              accountAddress={accountAddress}
              stakingContract={stakingContract}
            />
          ) : (
            <Unstake
              accountAddress={accountAddress}
              stakingContract={stakingContract}
            />
          )}
        </section>
      </section>

      <LockedStaking stakingContract={stakingContract} />
    </section>
  );
};

export default Staking;
