"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ICONS } from "../_icons/Icons";
import styles from "../_comp_styles/dashboard.module.css";
import formStyles from "../_components/Forms/radicar.module.css";
import { useState } from "react";
import HeaderDashboard from "../_components/Header/HeaderDashboard";
import TextInput from "../_components/Forms/TextInput";
import SelectInput from "../_components/Forms/SelectInput";
import AreaInput from "../_components/Forms/AreaInput";
import Button from "../_components/buttons/Button";

const NAV_ITEMS = [
  { id: "radicar", label: "Radicar PQRS", badge: "+" },
  { id: "consultar", label: "Consultar mis PQRS", badge: null },
  { id: "estado", label: "Estado de solicitudes", badge: "2" },
];
const SECCIONES = {
  radicar: {
    title: "Radicar PQRS",
    sub: "Diligencia tu solicitud, petición, queja, reclamo o sugerencia",
  },
  consultar: {
    title: "Consultar mis PQRS",
    sub: "Historial completo de solicitudes radicadas",
  },
  estado: {
    title: "Estado de solicitudes",
    sub: "Seguimiento en tiempo real de tus PQRS activas",
  },
};
const Estudiantes = () => {
  const [seccion, setSeccion] = useState("radicar");
  const info = SECCIONES[seccion];
  const [radicado, setRadicado] = useState(null);
  return (
    <div>
      {/* <span className={styles.navIcon}>{ICONS.logout}</span> */}

      {/* ── SIDEBAR ── */}
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
          <div className={styles.avatar}>JS</div>
          <div>
            <div className={styles.userName}>Juan Suárez</div>
            <div className={styles.userCode}>Cod. 20241082</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navLabel}>Menú estudiante</div>
          {/* {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${seccion === item.id ? styles.active : ""}`}
              // onClick={() => setSeccion(item.id)}
            >
              <span className={styles.navIcon}>{ICONS[item.id]}</span>
              {item.label}
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </button>
          ))} */}
          <div className={styles.divider} />
          <button
            className={`${styles.navItem} ${styles.logout}`}
            // onClick={handleLogout}
          >
            <span className={styles.navIcon}>{ICONS.logout}</span>
            Cerrar sesión
          </button>
        </nav>
      </aside>
      {/* ── CONTENIDO ── */}
      <div className={styles.main}>
        <HeaderDashboard />

        <div className={styles.content}>
          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total radicadas</div>
              <div className={styles.statValue}>5</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>En proceso</div>
              <div className={styles.statValue}>
                <span
                  className={styles.dot}
                  style={{ background: "#E87722" }}
                />
                2
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Resueltas</div>
              <div className={styles.statValue}>
                <span
                  className={styles.dot}
                  style={{ background: "#7C3AED" }}
                />
                3
              </div>
            </div>
          </div>
          <div className={formStyles.formPQRS}>
            <Formik>
              <Form>
                <SelectInput label="Tipo de PQRS" name="tipo">
                  <option value="">Selecciona una opción</option>
                  <option value="peticion">Petición</option>
                  <option value="queja">Queja</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="sugerencia">Sugerencia</option>
                </SelectInput>
                <TextInput type="text" name="asunto" label="Asunto" />
                <AreaInput
                  name="descripcion"
                  label="Descripción"
                  placeholder="Escribe aquí los detalles de tu solicitud..."
                />
                <div>
                  <Button
                    type="submit"
                    text="Radicar PQRS"
                    className="primary_button"
                  />
                </div>
              </Form>
            </Formik>
          </div>

          {/* ── Sección: Consultar / Estado ── */}
          {(seccion === "consultar" || seccion === "estado") && (
            <div className={styles.pqrsList}>
              {lista.map((p) => (
                <div key={p.id} className={styles.pqrsItem}>
                  <span className={styles.radicado}>{p.id}</span>
                  <div className={styles.pqrsInfo}>
                    <div className={styles.pqrsTitulo}>{p.titulo}</div>
                    <div className={styles.pqrsMeta}>
                      {seccion === "estado"
                        ? "Última actualización:"
                        : "Radicada:"}{" "}
                      {p.fecha} · {p.dependencia}
                    </div>
                  </div>
                  <span
                    className={`${styles.estado} ${styles[ESTADO_CLASS[p.estado]]}`}
                  >
                    {p.estado}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Estudiantes;
