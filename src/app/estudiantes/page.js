"use client";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import DashboadUsrs from "../_components/dasboard/DashboadUsrs";
import styles from "../_comp_styles/dashboard.module.css";

const Estudiantes = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className={styles.alertBox} role="alert">
        <div className={styles.alertContent}>
          <h2 className={styles.alertTitle}>No has iniciado sesión</h2>
          <p className={styles.alertText}>
            Para ver y radicar PQRS necesitas iniciar sesión. Si ya tienes una
            cuenta, inicia sesión para continuar.
          </p>
          <div className={styles.alertActions}>
            <Link href="/login" className={styles.alertButton}>
              Ir al login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <DashboadUsrs />;
};

export default Estudiantes;
