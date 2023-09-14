import InputGroup from '@/components/ui/input-group';
import styles from './styles.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>CrowdCoin</h1>

      <InputGroup extentElement />
    </div>
  );
};

export default Header;
