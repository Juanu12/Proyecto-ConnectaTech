"use client";
import React from "react";
import { useUser } from "../../context/UserContext";
import DashboadUsrs from "../_components/dasboard/DashboadUsrs";

const Profesores = () => {
  const { user } = useUser();

  const displayName =
    user?.name ??
    user?.nombre ??
    user?.fullName ??
    user?.nombreCompleto ??
    "Usuario";
  const displayEmail = user?.email ?? user?.correo ?? "Sin correo";
  const displayRole = user?.role ?? user?.rol ?? "Sin rol";

  if (!user) {
    return <div>No hay usuario cargado en el context.</div>;
  }

  return (
    <div>
      <DashboadUsrs />
      <h1>Profesores</h1>
      <p>Nombre: {displayName}</p>
      <p>Correo: {displayEmail}</p>
      <p>Rol: {displayRole}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Profesores;
