import { useField } from "formik";
import styles from "./textInput.module.css";

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.textInput}>
      <label className={styles.textInput_label}>{label}</label>
      <select
        className={styles.textInput_error_container}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className={styles.textInput_error}>{meta.error}</p>
      ) : null}
    </div>
  );
};

export default SelectInput;
