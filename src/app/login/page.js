"use client";
import { useState } from "react";

export default function Login() {
  // State
  const [value, setValue] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  // Editar mi estado

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Validacion

  if (value.length > 10) {
    console.log(value);
  }

  // Envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <h3>Esto es un formulario</h3>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={value.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          value={value.correo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          value={value.contraseña}
          onChange={handleChange}
        />
      </div>
      <div>Validacion:</div>
    </div>
  );
}
