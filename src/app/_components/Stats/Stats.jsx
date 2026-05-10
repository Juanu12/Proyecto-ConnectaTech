"use client";
import styles from "../../_comp_styles/dashboard.module.css";
import { useUser } from "../../../context/UserContext";

const Stats = () => {
  const { user } = useUser();
  const pqrs = user?.pqrs ?? [];

  const total = pqrs.length;
  const enProceso = pqrs.filter(
    (p) => (p.status ?? "").toLowerCase() === "enviada",
  ).length;
  const resueltas = pqrs.filter(
    (p) => (p.status ?? "").toLowerCase() === "resuelta",
  ).length;

  return (
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>Total radicadas</div>
        <div className={styles.statValue}>{total}</div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statLabel}>En proceso</div>
        <div className={styles.statValue}>
          <span className={styles.dot} style={{ background: "#E87722" }} />
          {enProceso}
        </div>
      </div>

      <div className={styles.statCard}>
        <div className={styles.statLabel}>Resueltas</div>
        <div className={styles.statValue}>
          <span className={styles.dot} style={{ background: "#7C3AED" }} />
          {resueltas}
        </div>
      </div>
    </div>
  );
};

export default Stats;
