'use client';

import { Beans, Swap, Metamask } from '@web3uikit/icons';
import { FC, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import styles from './styles.module.css';

const Header: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { address, isConnected } = useAccount();

  const { data: ensName } = useEnsName({ address });

  const { connect, connectors, isLoading, pendingConnector } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isConnected]);

  return (
    <section className={styles.header}>
      <section className={styles.header_logo_section}>
        <h1 className={styles.title}>Beans Staking</h1>

        <Beans fontSize="20px" className={styles.beans} />
      </section>

      <section className={styles.header_btn}>
        {isLoggedIn ? (
          <>
            <Metamask fontSize="25px" />
            {ensName ?? address}
            <button className={styles.connect_btn} onClick={() => disconnect()}>
              DISCONNECT WALLET
            </button>
          </>
        ) : (
          <>
            {connectors.map((connector) => (
              <button
                className={styles.connect_btn}
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                Connect to {connector.name}
                {isLoading && pendingConnector?.id === connector.id && (
                  <Swap fontSize="20px" />
                )}
              </button>
            ))}
          </>
        )}
      </section>
    </section>
  );
};

export default Header;
