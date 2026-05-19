"use client";
import * as Yup from "yup";
import styles from "../../_comp_styles/dashboard.module.css";
import formStyles from "../../_components/Forms/radicar.module.css";

import SideBar from "../sideBar/SideBar";
import HeaderDashboard from "../Header/HeaderDashboard";
import Stats from "../Stats/Stats";
import { Formik, Form } from "formik";
import SelectInput from "../Forms/SelectInput";
import TextInput from "../Forms/TextInput";
import AreaInput from "../Forms/AreaInput";
import Button from "../buttons/Button";
import ListPqrs from "./ListPqrs";
import { useUser } from "@/context/UserContext";

const API_URL = "https://69d19ec65043d95be9711a7f.mockapi.io/api/v1/pqrs";

const DashboadUsrs = () => {
  const user = useUser();
  const currentUser = user?.user;

  if (!currentUser) {
    return <div>Cargando usuario...</div>;
  }

  console.log(currentUser);

  // Valores iniciales para radicar una pqrs
  const initialValues = {
    sentFrom: currentUser.email,
    sentTo: "carlos@unab.edu.co",
    type: "",
    subject: "",
    description: "",
    status: "enviada",
    response: "",
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string().required("Selecciona un tipo de PQRS"),
    subject: Yup.string()
      .trim()
      .min(3, "El asunto debe tener al menos 3 caracteres")
      .required("El asunto es obligatorio"),
    description: Yup.string()
      .trim()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("La descripción es obligatoria"),
  });

  // Crea una pqrs y la guarda en el endpoint de PQRS
  const handleSubmit = async (values, actions) => {
    try {
      const newPqrs = {
        status: values.status || "enviada",
        type: values.type,
        subject: values.subject,
        description: values.description,
        sentFrom: currentUser.email,
        sentTo: values.sentTo,
        response: values.response || "",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPqrs),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar PQRS: ${response.status}`);
      }

      actions?.resetForm?.();
    } catch (error) {
      console.error("Error al guardar la PQRS", error);
      throw error;
    }
  };

  return (
    <div>
      {/* ── SIDEBAR ── */}
      <SideBar />

      {/* ── CONTENIDO ── */}
      <div className={styles.main}>
        <HeaderDashboard />

        <div className={styles.content}>
          {/* Stats */}
          <Stats />
          {currentUser.role === "docente" && <ListPqrs />}
          {currentUser.role === "estudiante" && (
            <div className={formStyles.formPQRS}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
              >
                <Form>
                  <SelectInput label="Tipo de PQRS" name="type">
                    <option value="">Selecciona una opción</option>
                    <option value="peticion">Petición</option>
                    <option value="queja">Queja</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                  </SelectInput>
                  <TextInput type="text" name="subject" label="Asunto" />
                  <AreaInput
                    name="description"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboadUsrs;
