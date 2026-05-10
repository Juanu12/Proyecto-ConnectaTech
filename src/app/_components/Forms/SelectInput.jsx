import { useField } from "formik";
import styles from "./textInput.module.css";

const SelectInput = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textInput}>
      <label className={styles.textInput_label} htmlFor={field.name}>
        {label}
      </label>
      <select className={styles.textInput_input} {...field} {...props}>
        {children}
      </select>
      <div className={styles.textInput_error_container}>
        {meta.touched && meta.error ? (
          <p className={styles.textInput_error}>{meta.error}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SelectInput;
