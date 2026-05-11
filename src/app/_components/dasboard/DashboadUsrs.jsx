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

const DashboadUsrs = () => {
  const initialValues = {
    tipo: "",
    asunto: "",
    descripcion: "",
  };

  const validationSchema = Yup.object().shape({
    tipo: Yup.string().required("Selecciona un tipo de PQRS"),
    asunto: Yup.string()
      .trim()
      .min(3, "El asunto debe tener al menos 3 caracteres")
      .required("El asunto es obligatorio"),
    descripcion: Yup.string()
      .trim()
      .min(10, "La descripción debe tener al menos 10 caracteres")
      .required("La descripción es obligatoria"),
  });

  const handleSubmit = (values) => {
    alert(
      `PQRS enviada:\n\nTipo: ${values.tipo}\nAsunto: ${values.asunto}\nDescripción: ${values.descripcion}`,
    );
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

          <div className={formStyles.formPQRS}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
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
        </div>
      </div>
    </div>
  );
};

export default DashboadUsrs;
