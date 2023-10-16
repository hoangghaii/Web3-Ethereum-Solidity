import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import styles from './styles.module.css';

const Loading: FC = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_icon_container}>
        <GlobeAsiaAustraliaIcon className={styles.loading_icon} />
      </div>
    </div>
  );
};

export default Loading;
