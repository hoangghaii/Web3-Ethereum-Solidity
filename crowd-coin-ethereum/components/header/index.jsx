import styles from './styles.module.css';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <Link href="/" as="/">
          CrowdCoin
        </Link>
      </h1>

      <div className={styles.form_container}>
        <Input type="text" className={styles.input} />

        <Button variant="secondary" className={styles.btn_1}>
          Campaigns
        </Button>

        <Button variant="default" className={styles.btn_2}>
          <Link href="/campaigns/new" as="/campaigns/new">
            <Plus />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
