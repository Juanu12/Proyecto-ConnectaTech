"use client";
import styles from "../../_comp_styles/dashboard.module.css";
import { ICONS } from "../../_icons/Icons";
import { useUser } from "../../../context/UserContext";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout();
    } catch (e) {}
    router.push("/");
  };

  const displayName = user?.name ?? "Usuario";
  const displayCode = user?.id ?? "Sin código";
  const role = user?.role ?? "Sin rol";

  const avatarInitials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="9" r="2.5" fill="white" />
            </svg>
          </div>
          <div>
            <div className={styles.logoText}>ConectaTech</div>
            <div className={styles.logoSub}>UNAB · PQRS</div>
          </div>
        </div>
      </div>

      <div className={styles.userCard}>
        <div className={styles.avatar}>{avatarInitials}</div>
        <div>
          <div className={styles.userName}>{displayName}</div>
          <div className={styles.userCode}>Cod. {displayCode}</div>
          <div className={styles.userName}>Rol: {role}</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navLabel}>Menú estudiante</div>

        <div className={styles.divider} />
        <button
          className={`${styles.navItem} ${styles.logout}`}
          onClick={handleLogout}
        >
          <span className={styles.navIcon}>{ICONS.logout}</span>
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
