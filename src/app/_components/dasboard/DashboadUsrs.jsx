"use client";
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

  const handleSubmit = (values) => {
    console.log(values);
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
