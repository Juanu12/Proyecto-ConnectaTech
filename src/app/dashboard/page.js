"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./MenuEstudiantes.module.css";

// ── Datos ──────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "radicar", label: "Radicar PQRS", badge: "+" },
  { id: "consultar", label: "Consultar mis PQRS", badge: null },
  { id: "estado", label: "Estado de solicitudes", badge: null },
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

const ESTADO_CLASS = {
  Resuelta: "done",
  "En proceso": "pending",
  "En revisión": "review",
};

// ── Iconos ─────────────────────────────────────────────
function IconRadicar() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="14" height="12" rx="2" />
      <path d="M6 7h6M6 10h4" />
    </svg>
  );
}
function IconConsultar() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="5" />
      <path d="M13 13l2.5 2.5" />
    </svg>
  );
}
function IconEstado() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="9" r="6" />
      <path d="M9 6v3.5l2.5 1.5" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
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
  const [pqrsList, setPqrsList] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    tipo: "",
    asunto: "",
    prioridad: "Normal",
    descripcion: "",
  });
  const [radicado, setRadicado] = useState(null);

  // Cargar usuario y PQRS desde localStorage al iniciar
  useEffect(() => {
    // Intentar cargar usuario del localStorage
    const userData = localStorage.getItem("usuarioActual");
    
    console.log("Datos en localStorage:", userData); // Para debugging
    
    if (userData) {
      const usuarioParseado = JSON.parse(userData);
      console.log("Usuario cargado:", usuarioParseado); // Para debugging
      setUsuario(usuarioParseado);
      
      // Cargar PQRS del usuario específico
      const stored = localStorage.getItem(`pqrs_${usuarioParseado.id}`);
      if (stored) {
        setPqrsList(JSON.parse(stored));
      }
    } else {
      // Si no hay usuario, redirigir al login
      console.log("No hay usuario, redirigiendo a login");
      router.push("/login");
    }
  }, [router]);

  // Guardar PQRS en localStorage cada vez que cambia
  useEffect(() => {
    if (usuario && pqrsList.length > 0) {
      localStorage.setItem(`pqrs_${usuario.id}`, JSON.stringify(pqrsList));
    } else if (usuario && pqrsList.length === 0) {
      localStorage.setItem(`pqrs_${usuario.id}`, JSON.stringify([]));
    }
  }, [pqrsList, usuario]);

  // Si no hay usuario, mostrar loading mientras redirige
  if (!usuario) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Verificando sesión...</p>
      </div>
    );
  }

  const info = SECCIONES[seccion];

  // Estadísticas dinámicas
  const totalRadicadas = pqrsList.length;
  const enProceso = pqrsList.filter(p => p.estado !== "Resuelta").length;
  const resueltas = pqrsList.filter(p => p.estado === "Resuelta").length;

  // Actualizar badge del estado
  NAV_ITEMS[2].badge = enProceso > 0 ? enProceso.toString() : null;

  // Formulario
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRadicar = () => {
    const { tipo, asunto, descripcion } = form;
    if (!tipo || !asunto || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Generar radicado único
    const nuevoRadicado = `#CT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Obtener fecha actual formateada
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    // Crear nueva PQRS
    const nuevaPqrs = {
      id: nuevoRadicado,
      titulo: form.asunto,
      tipo: form.tipo,
      prioridad: form.prioridad,
      descripcion: form.descripcion,
      fecha: fechaFormateada,
      fechaCompleta: fechaActual.toISOString(),
      dependencia: "Por asignar",
      estado: "En proceso",
      usuarioId: usuario.id,
      usuarioEmail: usuario.email
    };

    setPqrsList([nuevaPqrs, ...pqrsList]);
    setRadicado(nuevoRadicado);
    setForm({ tipo: "", asunto: "", prioridad: "Normal", descripcion: "" });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => setRadicado(null), 3000);
  };

  const handleLogout = () => {
    if (confirm("¿Deseas cerrar sesión?")) {
      localStorage.removeItem("usuarioActual");
      router.push("/login");
    }
  };

  // Lista filtrada según sección
  const lista =
    seccion === "estado"
      ? pqrsList.filter((p) => p.estado !== "Resuelta")
      : pqrsList;

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
          <div className={styles.avatar}>
            {usuario.iniciales || usuario.nombre?.charAt(0) || usuario.email?.charAt(0)}
          </div>
          <div>
            <div className={styles.userName}>{usuario.nombre}</div>
            <div className={styles.userCode}>{usuario.email}</div>
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
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>{info.title}</h1>
            <p className={styles.pageSub}>{info.sub}</p>
          </div>
        </header>

        <div className={styles.content}>
          {/* Stats dinámicos */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Total radicadas</div>
              <div className={styles.statValue}>{totalRadicadas}</div>
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
                  <select name="prioridad" value={form.prioridad} onChange={handleChange}>
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
            <>
              {lista.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>📭 No tienes solicitudes {seccion === "estado" ? "activas" : "registradas"}</p>
                  <button 
                    className={styles.btnPrimary}
                    onClick={() => setSeccion("radicar")}
                  >
                    Crear primera PQRS
                  </button>
                </div>
              ) : (
                <div className={styles.pqrsList}>
                  {lista.map((p) => (
                    <div key={p.id} className={styles.pqrsItem}>
                      <span className={styles.radicado}>{p.id}</span>
                      <div className={styles.pqrsInfo}>
                        <div className={styles.pqrsTitulo}>{p.titulo}</div>
                        <div className={styles.pqrsMeta}>
                          Tipo: {p.tipo} · {p.dependencia} · {p.fecha}
                          {p.prioridad !== "Normal" && (
                            <span className={styles.prioridadBadge}> · {p.prioridad}</span>
                          )}
                        </div>
                      </div>
                      <span className={`${styles.estado} ${styles[ESTADO_CLASS[p.estado]]}`}>
                        {p.estado}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}