"use client";
import { useState, useEffect } from "react";
import styles from "../../_comp_styles/dashboard.module.css";
import { useUser } from "../../../context/UserContext";

const API_URL = "https://69d19ec65043d95be9711a7f.mockapi.io/api/v1/pqrs";

const Stats = () => {
  const { user } = useUser();
  const [pqrs, setPqrs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPqrs = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error fetching PQRS");
        const all = await res.json();

        const relevant = Array.isArray(all)
          ? all.filter((p) =>
              user.role === "estudiante"
                ? p.sentFrom === user.email
                : p.sentTo === user.email,
            )
          : [];

        setPqrs(relevant);
      } catch (err) {
        console.error("Stats fetch error", err);
        setPqrs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, [user]);

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
