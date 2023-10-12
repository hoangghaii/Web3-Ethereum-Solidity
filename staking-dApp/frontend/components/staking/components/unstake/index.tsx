import { Asset, AssetContract } from '@/types';
import { calcDaysRemaining, toEther } from '@/utils';
import { Reload } from '@web3uikit/icons';
import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import {
  useContractRead,
  useContractReads,
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

const Unstake: FC<Props> = ({ accountAddress, stakingContract }: Props) => {
  const [unstakeValue, setUnstakeValue] = useState<string>('');

  const [value] = useDebounce(unstakeValue, 1000);

  const [assets, setAssets] = useState<Asset[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: positionIds,
    isError: positionIdsError,
    isLoading: positionIdsLoading,
  } = useContractRead({
    ...stakingContract,
    functionName: 'getPositionIdsForAddress',
    args: [accountAddress],
  });

  const {
    data: assetsContractData,
    isError: assetsContractError,
    isLoading: assetsContractLoading,
    refetch: assetsContractRefetch,
  } = useContractReads({
    contracts: positionIds?.map((item) => ({
      ...stakingContract,
      functionName: 'getPositionById',
      args: [item],
    })),
  });

  const { config } = usePrepareContractWrite({
    ...stakingContract,
    functionName: 'closePosition',
    args: [Number(value)],
    enabled: value !== '',
  });

  const { data: writeContractData, write } = useContractWrite(config);

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: writeContractData?.hash,
  });

  function parseAssets() {
    if (!assetsContractData) return;

    const assets = [];

    for (let index = 0; index < assetsContractData.length; index++) {
      const item = assetsContractData[index];

      const itemResult = item.result as unknown as AssetContract;

      const asset: Asset = {
        positionId: Number(itemResult.positionId),
        walletAddress: itemResult.walletAddress,
        percentInterest: Number(itemResult.percentInterest) / 100,
        daysRemaining: calcDaysRemaining(Number(itemResult.unlockDate)),
        etherInterest: toEther(String(Number(itemResult.weiInterest))),
        etherStaked: toEther(String(Number(itemResult.weiStaked))),
        open: itemResult.open,
      };

      assets.push(asset);
    }

    setAssets(assets);
  }

  const isDisable = !write || unstakeValue === '';

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);

      if (data) {
        toast.success('Transaction Successful!');
        assetsContractRefetch();
      }

      if (isError) {
        toast.error('Transaction Failed!');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isError, isLoading]);

  useEffect(() => {
    if (positionIdsError || assetsContractError) {
      toast.error('Can not get assets!');
    }
  }, [positionIdsError, assetsContractError]);

  useEffect(() => {
    parseAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetsContractData]);

  return (
    <section className={styles.staking_box}>
      <h2>Unstake</h2>

      <input
        className={styles.input_field}
        style={{
          width: '80%',
        }}
        value={unstakeValue}
        onChange={(e) => setUnstakeValue(e.target.value)}
        type="number"
        id="inputField"
        maxLength={120}
        placeholder="Enter index of balance"
        required
      />

      <section className={styles.staking_info}>
        <div className={styles.staking_unstake}>
          Balance:{' '}
          <p className={styles.staking_unstake_values}>
            {positionIdsLoading ||
              (assetsContractLoading && (
                <Reload fontSize="20px" className="animate-spin" />
              ))}

            {assets.length > 0 &&
              assets.map((a: Asset, id) => (
                <span
                  key={id}
                  className={a.open ? '' : styles.staking_unstake_value_unvalid}
                >
                  {a.etherStaked}
                </span>
              ))}
          </p>
        </div>

        {/* <p>Transaction Cost</p> */}
        <p>
          You Choose:{' '}
          {unstakeValue === '' ? '' : assets[Number(unstakeValue)].etherStaked}
        </p>
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
        UNSTAKE
      </button>
    </section>
  );
};

export default Unstake;
