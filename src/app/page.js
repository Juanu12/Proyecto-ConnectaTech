import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Button from "./_components/buttons/Button";

export default function Home() {
  return (
    <div>
      {/* HERO (pantalla completa centrada) */}
      <div className={styles.hero}>
        <div className={styles.wrapper}>
          <h1 className={styles.titulo}>Conecta tech</h1>

          <hr className={styles.linea} />

          <Image
            className={styles.UniLogo}
            src="/LogoU.png"
            alt="Logo U"
            width={340}
            height={150}
          />
        </div>

        <div className={styles.center}>
          <Link href="/login">
            <button className={styles.boton}>Ingresar</button>
          </Link>
        </div>

        <div className={styles.scroll}>↓</div>
      </div>

      {/* Pagina */}
      <div className={styles.content}>
        <section className={styles.seccion1}>
          <h2>¿Qué somos?</h2>
          <p>
            Este proyecto busca conectar, principalmente a la comunidad del
            programa de desarrollo de software, mediante la gestión de PQRS de
            importancia, media alta, para que sean atendidas con la prioridad
            que merecen y ayuden a generar, una recepción positiva, y mayor
            conformidad en el programa.
          </p>
        </section>

        <section className={styles.seccion2}>
          <h2>Noticias</h2>
          <p>
            Próximamente encontrarás aquí actualizaciones, novedades y contenido
            relevante sobre el programa.
          </p>
        </section>
      </div>
    </div>
  );
}
