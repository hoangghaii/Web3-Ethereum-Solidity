import styles from './styles.module.css';

const Button = ({
  title,
  onClick,
  icon = '',
  type = 'button',
  loading = false,
}) => {
  return (
    <button type={type} className={styles.btn} onClick={onClick}>
      {title}

      {icon}

      {loading && (
        <span class={styles.spinner} role="status" aria-label="loading">
          <span class="sr-only">Loading...</span>
        </span>
      )}
    </button>
  );
};

export default Button;
