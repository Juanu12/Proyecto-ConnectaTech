"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useUser } from "@/context/UserContext";
import AreaInput from "../Forms/AreaInput";
import Button from "../buttons/Button";
import styles from "./listpqrs.module.css";

const API_URL = "https://69d19ec65043d95be9711a7f.mockapi.io/api/v1/pqrs";

const responseSchema = Yup.object().shape({
  response: Yup.string()
    .trim()
    .min(10, "La respuesta debe tener al menos 10 caracteres")
    .required("La respuesta es obligatoria"),
});

const ListPqrs = () => {
  const { user } = useUser();
  // Estados para manejar la lista de PQRS, el estado de carga y posibles errores durante la consulta a la API
  const [pqrs, setPqrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar todas las PQRS del usuario docente
  const userEmail = user?.email;

  // UseEffect para cargar las PQRS asignadas al docente al montar el componente,
  // y cada vez que cambie el email del usuario. Si no hay email, no se hace la consulta.
  useEffect(() => {
    if (!userEmail) return;

    let isActive = true;

    const loadPqrs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error al cargar PQRS: ${response.status}`);
        }

        const allPqrs = await response.json();
        const userPqrs = Array.isArray(allPqrs)
          ? allPqrs.filter((p) => p.sentTo === userEmail)
          : [];

        if (isActive) setPqrs(userPqrs);
      } catch (loadError) {
        if (isActive)
          setError(loadError.message || "No fue posible cargar las PQRS");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadPqrs();

    return () => {
      isActive = false;
    };
  }, [userEmail]);

  if (!user) {
    return <div>Cargando usuario...</div>;
  }

  if (user.role !== "docente") {
    return null;
  }

  // Fucion que actualiza una PQRS con la respuesta del docente, y cambia su estado a "resuelta"
  const handleResponse = async (item, values, actions) => {
    const updatedItem = {
      ...item,
      response: values.response,
      status: "resuelta",
    };

    const response = await fetch(`${API_URL}/${encodeURIComponent(item.id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error(`Error al responder PQRS: ${response.status}`);
    }

    const savedItem = await response.json();
    setPqrs((current) =>
      current.map((pqrsItem) =>
        pqrsItem.id === savedItem.id ? savedItem : pqrsItem,
      ),
    );
    actions.resetForm();
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>PQRS recibidas</h2>
      </div>

      {loading && <div className={styles.loading}>Cargando PQRS...</div>}

      {!loading && error && <div className={styles.error}>{error}</div>}

      {!loading && !error && pqrs.length === 0 && (
        <div className={styles.empty}>No hay PQRS asignadas a tu correo.</div>
      )}

      {!loading && !error && pqrs.length > 0 && (
        <div className={styles.grid}>
          {pqrs.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <strong className={styles.subject}>
                  {item.subject || item.type || "PQRS sin asunto"}
                </strong>
                <span className={styles.statusBadge}>
                  {item.status || "Sin estado"}
                </span>
              </div>

              <p className={styles.description}>{item.description}</p>

              <div className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <strong>Remitente:</strong> {item.sentFrom}
                </div>
                <div className={styles.metaItem}>
                  <strong>Tipo:</strong> {item.type}
                </div>
                <div className={styles.metaItem}>
                  <strong>ID:</strong> {item.id}
                </div>
              </div>

              {item.status !== "resuelta" && (
                <Formik
                  initialValues={{ response: item.response || "" }}
                  validationSchema={responseSchema}
                  onSubmit={(values, actions) =>
                    handleResponse(item, values, actions)
                  }
                >
                  <Form>
                    <AreaInput
                      name="response"
                      label="Responder"
                      placeholder="Escribe la respuesta aquí..."
                    />
                    <Button
                      type="submit"
                      text="Contestar"
                      className="primary_button"
                    />
                  </Form>
                </Formik>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListPqrs;
