import styles from './styles.module.css';

const Heading = ({ title }) => {
  return <h4 className={styles.title}>{title}</h4>;
};

export default Heading;
