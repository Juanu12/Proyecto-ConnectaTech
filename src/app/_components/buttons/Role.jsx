import Image from "next/image";
import styles from "./role.module.css";

const Role = ({ role, onClick, active = false }) => {
  return (
    <button
      type="button"
      className={`${styles.button_base} ${active ? styles.active : styles.inactive}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <span>{role}</span>
    </button>
  );
};

export default Role;
