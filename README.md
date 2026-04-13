 # Descripcion del proyecto

 - El proyecto “Conecta Tech” consiste en diseñar y desarrollar un prototipo funcional de Preguntas Quejas Reclamos y Sugerencias interno enfocado al programa “Tecnología en Desarrollo de Software Dual” de la UNAB. 

 - Este prototipo tiene como objetivo principal validar la facilidad en la comunicación entre estudiantes y profesores del programa “Tecnología en Desarrollo de Software Dual” reduciendo los tiempos de respuesta mediante el uso de un sistema Peticiones, Quejas, Reclamos y Sugerencias, con el fin de manejar situaciones de bajo impacto que no requieran de una intervención a un nivel académico directivo superior.




## Donde visualizar el proyecto en la web

https://proyecto-connecta-tech.vercel.app/

<br>

## Pre requisitos para el proyecto

- Contar con la ultima y mas estable version de node js


- Contar con una cuenta de github



## Como se inicializar el proyecto

First, run the development server:


```bash

# 1

## utilizar el comando : 
git clone  https://github.com/Juanu12/Proyecto-ConnectaTech

# 2
## Abrir el proyecto en terminal o visual studio , y ulilizar el comando en terminal


npm i

# 3
npm run dev

# 4

## Elejir en la terminal servidor de preferencia 

```

# Tecnologías principales usadas:

- Next js
- React 
- Node Js
- Html 
- Css 


## Otros recursos utilizados

</br>

### **Mockapi** : este servicio provee endpoints online los cuáles se pueden llamar en proyectos sin necesidad de crearlos con backend real


<br>
<br>

# Framework

- Next js


# Librería principal

- React

# Otras dependencias utilizadas 

### **Formik** : Se utiliza para gestionar formularios de manera estructurada. Permite controlar el estado de los campos, manejar eventos de envío y gestionar errores de forma centralizada, reduciendo la complejidad del código.

### **Yup** : Se emplea para definir esquemas de validación de datos. Facilita la implementación de reglas como campos obligatorios, formatos específicos y restricciones de longitud, integrándose de forma directa con Formik.

<br>
<br>

```text
Proyecto-ConnectaTech/
├── README.md                          # Documentación principal del proyecto
├── package.json                       # Dependencias, scripts y configuración general
├── package-lock.json                  # Versiones exactas instaladas de las dependencias
├── jsconfig.json                      # Alias de importación para rutas del proyecto
├── eslint.config.mjs                  # Configuración de ESLint
├── next.config.mjs                    # Configuración principal de Next.js
├── public/                            # Archivos estáticos accesibles públicamente
│   ├── LogoU.png                      # Logo usado en la página principal
│   ├── logo_unab_.png                 # Logo adicional institucional
│   ├── Edificio-Armando-Puyana-Puyana.webp # Imagen de apoyo visual
│   ├── estudiantes.svg                # Ícono para rol estudiante
│   └── profesores.svg                 # Ícono para rol docente
└── src/
    └── app/                           # App Router de Next.js
        ├── globals.css                # Estilos globales de toda la aplicación
        ├── layout.js                  # Layout principal compartido por todas las rutas
        ├── page.js                    # Página principal (home)
        ├── page.module.css            # Estilos específicos de la home
        ├── _components/               # Componentes reutilizables
        │   ├── Forms/
        │   │   ├── TextInput.jsx      # Campo de texto reutilizable conectado con Formik
        │   │   └── textInput.module.css # Estilos del input reutilizable
        │   └── buttons/
        │       ├── Button.jsx         # Botón reutilizable
        │       ├── button.module.css  # Estilos del botón
        │       ├── Role.jsx           # Selector visual de rol
        │       └── role.module.css    # Estilos del selector de rol
        ├── login/
        │   ├── page.js                # Página de inicio de sesión
        │   └── login.module.css       # Estilos del login
        ├── dashboard/
        │   ├── page.js                # Panel principal de PQRS
        │   └── MenuEstudiantes.module.css # Estilos del dashboard
        └── menuEst/
            └── page.js                # Página de pruebas o ruta experimental
```

## Créditos 

Sebastian Ricardo Torres

Maria Alejandra Grandas

Juan Fernando Umaña