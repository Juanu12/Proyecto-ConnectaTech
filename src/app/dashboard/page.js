"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./MenuEstudiantes.module.css";

// ── Datos ──────────────────────────────────────────────
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

const PQRS_DATA = [
  {
    id: "#CT-2024-001",
    titulo: "Solicitud de paz y salvo académico",
    fecha: "10 mar 2024",
    dependencia: "Registro y Control",
    estado: "Resuelta",
  },
  {
    id: "#CT-2024-002",
    titulo: "Queja por error en calificación",
    fecha: "22 mar 2024",
    dependencia: "Facultad de Ingeniería",
    estado: "En proceso",
  },
  {
    id: "#CT-2024-003",
    titulo: "Reclamo facturación semestre",
    fecha: "5 abr 2024",
    dependencia: "Financiera",
    estado: "En revisión",
  },
  {
    id: "#CT-2024-004",
    titulo: "Petición de certificado de estudio",
    fecha: "18 abr 2024",
    dependencia: "Registro y Control",
    estado: "Resuelta",
  },
  {
    id: "#CT-2024-005",
    titulo: "Sugerencia mejora laboratorios",
    fecha: "2 may 2024",
    dependencia: "Bienestar Universitario",
    estado: "En proceso",
  },
];

const ESTADO_CLASS = {
  Resuelta: "done",
  "En proceso": "pending",
  "En revisión": "review",
};

// ── Iconos ─────────────────────────────────────────────
function IconRadicar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="3" width="14" height="12" rx="2" />
      <path d="M6 7h6M6 10h4" />
    </svg>
  );
}
function IconConsultar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="5" />
      <path d="M13 13l2.5 2.5" />
    </svg>
  );
}
function IconEstado() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M9 6v3.5l2.5 1.5" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3" />
      <path d="M12 12l3-3-3-3M15 9H7" />
    </svg>
  );
}
const ICONS = {
  radicar: <IconRadicar />,
  consultar: <IconConsultar />,
  estado: <IconEstado />,
};

// ── Componente principal ───────────────────────────────
export default function Dashboard() {
  const router = useRouter();
  const [seccion, setSeccion] = useState("radicar");
  const [form, setForm] = useState({
    tipo: "",
    asunto: "",
    prioridad: "Normal",
    descripcion: "",
  });
  const [radicado, setRadicado] = useState(null);

  const info = SECCIONES[seccion];

  // Formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRadicar = () => {
    const { tipo, asunto, descripcion } = form;
    if (!tipo || !asunto || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }
    setRadicado("#CT-2024-0" + Math.floor(Math.random() * 90 + 10));
    setForm({ tipo: "", asunto: "", prioridad: "Normal", descripcion: "" });
  };

  const handleLogout = () => {
    if (confirm("¿Deseas cerrar sesión?")) router.push("/login");
  };

  // Lista filtrada
  const lista =
    seccion === "estado"
      ? PQRS_DATA.filter((p) => p.estado !== "Resuelta")
      : PQRS_DATA;

  return (
    <div className={styles.shell}>
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.navItem} ${seccion === item.id ? styles.active : ""}`}
              onClick={() => setSeccion(item.id)}
            >
              <span className={styles.navIcon}>{ICONS[item.id]}</span>
              {item.label}
              {item.badge && <span className={styles.badge}>{item.badge}</span>}
            </button>
          ))}
          <div className={styles.divider} />
          <button
            className={`${styles.navItem} ${styles.logout}`}
            onClick={handleLogout}
          >
            <span className={styles.navIcon}>
              <IconLogout />
            </span>
            Cerrar sesión
          </button>
        </nav>
      </aside>

      {/* ── CONTENIDO ── */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>{info.title}</h1>
            <p className={styles.pageSub}>{info.sub}</p>
          </div>
          <button
            className={styles.btnPrimary}
            onClick={() => setSeccion("radicar")}
          >
            + Nueva PQRS
          </button>
        </header>

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

          {/* ── Sección: Radicar ── */}
          {seccion === "radicar" && (
            <div className={styles.card}>
              {radicado && (
                <div className={styles.successBanner}>
                  ✅ PQRS radicada — Radicado: <strong>{radicado}</strong>
                  <button onClick={() => setRadicado(null)}>×</button>
                </div>
              )}
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Tipo de solicitud</label>
                  <select name="tipo" value={form.tipo} onChange={handleChange}>
                    <option value="">Selecciona…</option>
                    {["Petición", "Queja", "Reclamo", "Sugerencia"].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Asunto</label>
                  <input
                    type="text"
                    name="asunto"
                    value={form.asunto}
                    onChange={handleChange}
                    placeholder="Resume tu solicitud…"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Prioridad</label>
                  <select
                    name="prioridad"
                    value={form.prioridad}
                    onChange={handleChange}
                  >
                    {["Normal", "Alta", "Urgente"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className={`${styles.formGroup} ${styles.full}`}>
                  <label>Descripción detallada</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe tu situación…"
                    rows={4}
                  />
                </div>
              </div>
              <div className={styles.formActions}>
                <button
                  className={styles.btnSecondary}
                  onClick={() =>
                    setForm({
                      tipo: "",
                      asunto: "",
                      prioridad: "Normal",
                      descripcion: "",
                    })
                  }
                >
                  Limpiar
                </button>
                <button className={styles.btnPrimary} onClick={handleRadicar}>
                  Radicar PQRS
                </button>
              </div>
            </div>
          )}

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
}
