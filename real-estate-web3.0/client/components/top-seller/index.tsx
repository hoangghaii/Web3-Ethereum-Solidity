import { Text } from '@radix-ui/themes';
import { FC } from 'react';

import styles from './styles.module.css';

const TopSeller: FC = () => {
  return (
    <Text size="2" className={styles.TopSeller}>
      TopSeller
    </Text>
  );
};

export default TopSeller;
