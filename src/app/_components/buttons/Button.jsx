import styles from "./button.module.css";

const Button = ({ className, text, type = "button" }) => {
  return (
    <button
      type={type}
      className={`${styles.button_base} ${className ? styles[className] : ""}`}
    >
      {text}
    </button>
  );
};

export default Button;
