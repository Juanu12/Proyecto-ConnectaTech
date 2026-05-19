"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../../_comp_styles/dashboard.module.css";
import { useUser } from "@/context/UserContext";

const API_URL = "https://69d19ec65043d95be9711a7f.mockapi.io/api/v1/pqrs";

const getStatusClass = (status) => {
  const normalized = (status ?? "").toLowerCase();

  if (normalized === "resuelta") return styles.done;
  if (normalized === "enviada") return styles.pending;
  return styles.review;
};

export default function EstudianteDetalle() {
  const user = useUser();
  const userEmail = user?.user?.email;
  const [pqrs, setPqrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    const fetchPqrs = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error fetching PQRS");

        const allPqrs = await res.json();
        const filtered = Array.isArray(allPqrs)
          ? allPqrs.filter((p) => p.sentFrom === userEmail)
          : [];
        setPqrs(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, [userEmail]);

  return (
    <div className={styles.studentPage}>
      <div className={styles.studentCard}>
        <div className={styles.backRow}>
          <Link className={styles.backLink} href="/estudiantes">
            ← Volver al dashboard
          </Link>
        </div>

        {loading && <p>Cargando PQRS...</p>}
        {error && (
          <div>
            <h1 className={styles.studentTitle}>Error</h1>
            <p className={styles.studentSubtitle}>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <>
            <h1 className={styles.studentTitle}>Mis PQRS</h1>
            <p className={styles.studentSubtitle}>
              {pqrs.length} PQRS registradas
            </p>

            <div className={styles.pqrsList}>
              {pqrs.length > 0 ? (
                pqrs.map((pqrsItem) => {
                  return (
                    <article className={styles.pqrsItem} key={pqrsItem.id}>
                      <div className={styles.radicado}>{pqrsItem.id}</div>

                      <div className={styles.pqrsInfo}>
                        <div className={styles.pqrsSubject}>
                          {pqrsItem.subject ||
                            pqrsItem.type ||
                            "PQRS sin asunto"}
                        </div>
                        <div className={styles.pqrsTitulo}>{pqrsItem.type}</div>
                        <div className={styles.pqrsMeta}>
                          {pqrsItem.description.length > 160
                            ? `${pqrsItem.description.slice(0, 160)}…`
                            : pqrsItem.description}
                        </div>
                        <div className={styles.pqrsMeta}>
                          Enviado a: {pqrsItem.sentTo}
                        </div>
                      </div>

                      <div className={styles.columnRight}>
                        <div
                          className={`${styles.estado} ${getStatusClass(
                            pqrsItem.status,
                          )}`}
                          aria-label={`Estado: ${pqrsItem.status}`}
                        >
                          {pqrsItem.status}
                        </div>
                      </div>

                      {pqrsItem.status?.toLowerCase() === "resuelta" && (
                        <div className={styles.responseBox}>
                          <span className={styles.responseLabel}>
                            Respuesta
                          </span>
                          <div className={styles.responseContent}>
                            {pqrsItem.response}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })
              ) : (
                <p className={styles.studentSubtitle}>
                  Este estudiante no tiene PQRS registradas.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
