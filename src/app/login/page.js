"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../_components/Forms/TextInput";
import styles from "./login.module.css";
import Button from "../_components/buttons/Button";
import Image from "next/image";
import Role from "../_components/buttons/Role";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL = "https://69d19fa95043d95be9711b95.mockapi.io/api/v1/Users";

export default function Login() {
  const router = useRouter();

  // Valores iniciales para el formularios
  const initialValues = {
    role: "estudiantes",
    email: "",
    password: "",
  };

  const ValidateSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo invalido")
      .matches(
        /^[A-Za-z0-9._%+-]+@unab\.edu\.co$/,
        "Debe ser un correo institucional de la UNAB",
      )
      .required("Email Requerido"),
    password: Yup.string().required("Password Requerido"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("No se pudo consultar la API");
      }

      const data = await response.json();
      const usersByRole = data?.[0]?.[values.role] ?? [];

      const user = usersByRole.find(
        (item) =>
          item.correo === values.email && item.password === values.password,
      );

      if (!user) {
        alert("Correo o contraseña incorrectos");
        return;
      }

      const targetPath =
        values.role === "estudiantes" ? "/estudiantes" : "/profesores";
      router.push(targetPath);
    } catch (error) {
      console.error(error);
      alert("Error al validar el usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src="/Edificio-Armando-Puyana-Puyana.webp"
            alt="Login Image"
            width={1440}
            height={960}
            loading="eager"
          />
        </div>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={ValidateSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className={styles.form_header}>
                  <Image
                    src="/logo_unab_.png"
                    alt="logo unab"
                    width={100}
                    height={31}
                  />

                  <h2>
                    Portal{" "}
                    {values.role === "estudiantes" ? "Estudiante" : "Docente"}
                  </h2>
                  <h4>Soy: </h4>
                </div>
                <div className={styles.form_header_buttons}>
                  <Role
                    role="Estudiante"
                    active={values.role === "estudiantes"}
                    onClick={() => setFieldValue("role", "estudiantes")}
                  />
                  <Role
                    role="Docente"
                    active={values.role === "profesores"}
                    onClick={() => setFieldValue("role", "profesores")}
                  />
                </div>

                <TextInput
                  type="email"
                  name="email"
                  label="Correo Institucional"
                />
                <TextInput type="password" name="password" label="Password" />

                <div className={styles.container_button}>
                  <Button
                    type="submit"
                    text="Ingresar"
                    className="primary_button"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
