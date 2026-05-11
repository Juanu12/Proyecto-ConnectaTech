"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { findUserById } from "@/data/users";
import styles from "../../_comp_styles/dashboard.module.css";

const getStatusClass = (status) => {
  const normalized = (status ?? "").toLowerCase();

  if (normalized === "resuelta") return styles.done;
  if (normalized === "enviada") return styles.pending;
  return styles.review;
};

const EstudianteDetalle = () => {
  const params = useParams();
  const { user: loggedUser } = useUser();
  const studentId = Array.isArray(params.id) ? params.id[0] : params.id;

  const student =
    findUserById(studentId) ??
    (loggedUser?.id === studentId ? loggedUser : null);

  if (!student) {
    return (
      <div className={styles.studentPage}>
        <div className={styles.studentCard}>
          <h1 className={styles.studentTitle}>Estudiante no encontrado</h1>
          <p className={styles.studentSubtitle}>
            No se encontró información para ese id.
          </p>
          <Link className={styles.backLink} href="/estudiantes">
            Volver
          </Link>
        </div>
      </div>
    );
  }

  const pqrs = student.pqrs ?? [];

  return (
    <div className={styles.studentPage}>
      <div className={styles.studentCard}>
        <div style={{ marginBottom: "20px" }}>
          <Link className={styles.backLink} href="/estudiantes">
            ← Volver al dashboard
          </Link>
        </div>

        <h1 className={styles.studentTitle}>PQRS de {student.name}</h1>
        <p className={styles.studentSubtitle}>
          {student.email} · {student.role} · Semestre {student.semester}
        </p>

        <div className={styles.pqrsList}>
          {pqrs.length > 0 ? (
            pqrs.map((pqrsItem) => (
              <article className={styles.pqrsItem} key={pqrsItem.id}>
                <div className={styles.radicado}>{pqrsItem.id}</div>
                <div className={styles.pqrsInfo}>
                  <div className={styles.pqrsTitulo}>{pqrsItem.type}</div>
                  <div className={styles.pqrsMeta}>{pqrsItem.description}</div>
                  <div className={styles.pqrsMeta}>
                    Enviado a: {pqrsItem.sentTo}
                  </div>
                </div>
                <div
                  className={`${styles.estado} ${getStatusClass(
                    pqrsItem.status,
                  )}`}
                >
                  {pqrsItem.status}
                </div>
              </article>
            ))
          ) : (
            <p className={styles.studentSubtitle}>
              Este estudiante no tiene PQRS registradas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstudianteDetalle;
