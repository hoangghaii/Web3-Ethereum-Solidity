import { toWei } from '@/utils';
import { Reload } from '@web3uikit/icons';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import styles from '../../styles.module.css';

type Props = {
  stakingContract: {
    address: any;
    abi: any;
  };
};

const LockedStaking: FC<Props> = ({ stakingContract }: Props) => {
  const [amount, setAmount] = useState<string>('');

  const [tier, setTier] = useState<number>(30);

  const [value] = useDebounce(amount, 1000);

  const [loading, setLoading] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    ...stakingContract,
    functionName: 'stakeEther',
    args: [tier],
    value: toWei(value),
    enabled: value !== '',
  });

  const { data: writeContractData, write } = useContractWrite(config);

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: writeContractData?.hash,
  });

  const isDisable = !write || amount === '';

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);

      if (data) {
        toast.success('Transaction Successful!');

        setAmount('');
      }

      if (isError) {
        toast.error('Transaction Failed!');
      }
    }
  }, [data, isError, isLoading]);

  return (
    <section className={styles.staking_container_section}>
      <section className={styles.staking_info_section}>
        <h2>Locked Staking</h2>

        <h3>Locked days</h3>

        <div className={styles.staking_locked_tier_list}>
          <div className={styles.radio_field}>
            <input
              type="radio"
              id="tier-30"
              name="tier"
              value={30}
              className={styles.radio}
              checked={tier === 30}
              onClick={() => setTier(30)}
            />

            <label htmlFor="tier-30" className={styles.staking_locked_tier}>
              <div className={styles.staking_locked_tier_content}>
                <p className={styles.staking_locked_tier_title}>30 days</p>

                <span className={styles.locked_staking_APY}>8% APY</span>
              </div>
            </label>
          </div>

          <div className={styles.radio_field}>
            <input
              type="radio"
              id="tier-60"
              name="tier"
              value={60}
              className={styles.radio}
              checked={tier === 60}
              onClick={() => setTier(60)}
            />

            <label htmlFor="tier-60" className={styles.staking_locked_tier}>
              <div className={styles.staking_locked_tier_content}>
                <p className={styles.staking_locked_tier_title}>60 days</p>

                <span className={styles.locked_staking_APY}>9% APY</span>
              </div>
            </label>
          </div>

          <div className={styles.radio_field}>
            <input
              type="radio"
              id="tier-90"
              name="tier"
              value={90}
              className={styles.radio}
              checked={tier === 90}
              onClick={() => setTier(90)}
            />

            <label htmlFor="tier-90" className={styles.staking_locked_tier}>
              <div className={styles.staking_locked_tier_content}>
                <p className={styles.staking_locked_tier_title}>90 days</p>

                <span className={styles.locked_staking_APY}>12% APY</span>
              </div>
            </label>
          </div>
        </div>

        <input
          className={styles.input_field}
          type="number"
          id="inputField"
          maxLength={120}
          value={amount}
          placeholder="Enter Amount"
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button
          disabled={isDisable}
          className={
            loading || isDisable
              ? `${styles.stake_btn} ${styles.stake_btn_loading}`
              : styles.stake_btn
          }
          onClick={() => write?.()}
        >
          {loading && <Reload fontSize="20px" className="animate-spin" />}
          STAKE
        </button>
      </section>
    </section>
  );
};

export default LockedStaking;
