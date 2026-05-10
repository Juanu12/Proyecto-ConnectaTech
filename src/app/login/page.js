"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextInput from "../_components/Forms/TextInput";
import styles from "./login.module.css";
import Button from "../_components/buttons/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

export default function Login() {
  const router = useRouter();
  const { login } = useUser();

  // Valores iniciales para el formularios
  const initialValues = {
    email: "",
    password: "",
  };
  // Valores de validación con Yup
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
  // Funcion para manejar el submit (envio) del formulario
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      // Inicio del estado de envio, viene de formik
      setStatus("");
      // Consulta a la API con los datos del formulario, usando variables de entorno para la URL
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}?email=${values.email}&password=${values.password}`,
      );
      // Si la respuesta no es ok, lanza un error para ser capturado en el catch
      if (!response.ok) {
        throw new Error("No se pudo consultar la API");
      }
      // Parseo de la respuesta JSON, y manejo del caso donde la API devuelve un array de usuarios (aunque se espera uno solo)
      const data = await response.json();
      const user = Array.isArray(data) ? data[0] : null;
      // Si no se encuentra un usuario, se muestra un mensaje de error
      if (!user) {
        setStatus("No se encontró un usuario con esos datos.");
        return;
      }

      // Guardar en contexto el usuario completo que llega desde la API
      login(user);

      // Redirección basada en el rol del usuario, usando el router de Next.js para navegar a la página correspondiente
      if (user.role === "docente") {
        router.push("/profesores");
      } else {
        router.push("/estudiantes");
      }
    } catch (error) {
      setStatus(
        "No se pudo validar el usuario. Revisa tus datos e intenta de nuevo.",
      );
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
            {({ status }) => (
              <Form>
                <div className={styles.form_header}>
                  <Image
                    src="/logo_unab_.png"
                    alt="logo unab"
                    width={100}
                    height={31}
                  />

                  <h2>Portal de Conectatech</h2>
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
                {status ? (
                  <p className={styles.error_message} aria-live="polite">
                    {status}
                  </p>
                ) : null}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
