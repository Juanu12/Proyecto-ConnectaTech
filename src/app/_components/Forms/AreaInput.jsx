import { useField } from "formik";
import styles from "./textInput.module.css";

const AreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textInput}>
      <label className={styles.textInput_label} htmlFor={field.name}>
        {label}
      </label>
      <textarea {...field} {...props} className={styles.textInput_input} />
      <div className={styles.textInput_error_container}>
        {meta.touched && meta.error ? (
          <p className={styles.textInput_error}>{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default AreaInput;
