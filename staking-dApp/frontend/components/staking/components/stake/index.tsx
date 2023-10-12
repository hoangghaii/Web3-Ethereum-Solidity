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
  accountAddress: `0x${string}` | undefined;
  stakingContract: {
    address: any;
    abi: any;
  };
};

const Stake: FC<Props> = ({ accountAddress, stakingContract }: Props) => {
  const { data: accountBalance } = useBalance({
    address: accountAddress,
  });

  const [amount, setAmount] = useState<string>('');

  const [value] = useDebounce(amount, 1000);

  const [loading, setLoading] = useState<boolean>(false);

  const { config } = usePrepareContractWrite({
    ...stakingContract,
    functionName: 'stakeEther',
    args: [0],
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
      }

      if (isError) {
        toast.error('Transaction Failed!');
      }
    }
  }, [data, isError, isLoading]);

  return (
    <section className={styles.staking_box}>
      <h2>Stake</h2>

      <input
        className={styles.input_field}
        style={{
          width: '80%',
        }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        id="inputField"
        maxLength={120}
        placeholder="Enter Amount"
        required
      />

      <section className={styles.staking_info}>
        <p>
          Balance: <span>{accountBalance?.formatted}</span>
        </p>
        <p>Exchange Rate: 1.03582967</p>
        {/* <p>Transaction Cost</p> */}
      </section>

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
  );
};

export default Stake;
