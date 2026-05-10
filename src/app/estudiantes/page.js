"use client";
import { useUser } from "@/context/UserContext";
import DashboadUsrs from "../_components/dasboard/DashboadUsrs";

const Estudiantes = () => {
  const { user } = useUser();

  if (!user) {
    return <div>No hay usuario cargado en el context.</div>;
  }
  return <DashboadUsrs />;
};

export default Estudiantes;
