import Link from 'next/link';
import styles from './styles.module.css';

const Card = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>

        <Link
          href="/campaigns/[id]"
          as={`/campaigns/${title}`}
          className={styles.link}
        >
          View Campaign
          <svg
            className="w-2.5 h-auto"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
