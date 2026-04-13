import styles from "../../_comp_styles/dashboard.module.css";

const HeaderDashboard = () => {
  return (
    <header className={styles.topbar}>
      <div>
        <h1 className={styles.pageTitle}>Radicar PQRS</h1>
        <p className={styles.pageSub}>
          Diligencia tu solicitud, petición, queja, reclamo o sugerencia
        </p>
      </div>
    </header>
  );
};

export default HeaderDashboard;
