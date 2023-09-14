import { cn } from '@/lib/utils';
import SuccessIcon from '@/components/ui/icon/success';
import ErrorIcon from '@/components/ui/icon/error';
import styles from './styles.module.css';

const Input = ({
  label = '',
  error = false,
  success = false,
  register,
  icon = '',
  id = '',
}) => {
  return (
    <div className={styles.input_wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.input_container}>
        <input
          type="text"
          id={id}
          name={id}
          className={cn(styles.input, {
            [styles.input_error]: error,
            [styles.input_success]: success,
          })}
          required=""
          aria-describedby="hs-validation-name-success-helper"
          {...register}
        />

        <div className={styles.input_icon}>
          {icon && !error && !success && icon}
          {success && <SuccessIcon />}
          {error && <ErrorIcon />}
        </div>
      </div>
    </div>
  );
};

export default Input;
