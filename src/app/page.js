import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
     <div className={styles.page}>
      <h1 className={styles.titulo}>Conecta tech</h1>
   

      <p className={styles.texto}>Formulario aquí</p>
    </div>

  );
}
