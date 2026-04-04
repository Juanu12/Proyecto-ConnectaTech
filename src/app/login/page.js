"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../_components/Forms/TextInput";
import styles from "./login.module.css";
import Button from "../_components/buttons/Button";
import Image from "next/image";
import Role from "../_components/buttons/Role";
import Link from "next/link";
export default function Login() {
  const initialValues = { role: "student", email: "", password: "" };

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

  const handleSubmit = (values) => {
    console.log(values);
    // Aca puedo validar si estudiente ya existe
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
                    {values.role === "student" ? "Estudiante" : "Docente"}
                  </h2>
                  <h4>Soy: </h4>
                </div>
                <div className={styles.form_header_buttons}>
                  <Role
                    role="Estudiante"
                    active={values.role === "student"}
                    onClick={() => setFieldValue("role", "student")}
                  />
                  <Role
                    role="Docente"
                    active={values.role === "teacher"}
                    onClick={() => setFieldValue("role", "teacher")}
                  />
                </div>

                <TextInput
                  type="email"
                  name="email"
                  label="Correo Institucional"
                />
                <TextInput type="password" name="password" label="Password" />

                <div className={styles.container_button}>
                  <Link href="/dashboard">
                    <Button
                      type="submit"
                      text="Ingresar"
                      className="primary_button"
                    />
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
