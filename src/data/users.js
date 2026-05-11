export const USERS = [
  {
    id: "user-001",
    name: "Carlos Pérez",
    email: "carlos@unab.edu.co",
    password: "123456",
    role: "docente",
    semester: "2026-1",
    pqrs: [
      {
        id: "pqrs-001",
        status: "enviada",
        type: "Petición",
        description:
          "Solicitud de actualización del contenido del curso de bases de datos.",
        sentTo: "juan@unab.edu.co",
      },
      {
        id: "pqrs-002",
        status: "resuelta",
        type: "Queja",
        description: "Inconformidad con la asignación de horarios académicos.",
        sentTo: "maria@unab.edu.co",
      },
    ],
  },
  {
    id: "user-002",
    name: "Ana Gómez",
    email: "ana@unab.edu.co",
    password: "abcdef",
    role: "docente",
    semester: "2026-1",
    pqrs: [
      {
        id: "pqrs-003",
        status: "enviada",
        type: "Sugerencia",
        description:
          "Propuesta de incluir más proyectos prácticos en el programa.",
        sentTo: "pedro@unab.edu.co",
      },
    ],
  },
  {
    id: "user-003",
    name: "Juan López",
    email: "juan@unab.edu.co",
    password: "juan123",
    role: "estudiante",
    semester: "2026-1",
    pqrs: [
      {
        id: "pqrs-004",
        status: "enviada",
        type: "Petición",
        description: "Solicitud de tutorías adicionales en programación.",
        sentTo: "carlos@unab.edu.co",
      },
    ],
  },
  {
    id: "user-004",
    name: "María Díaz",
    email: "maria@unab.edu.co",
    password: "maria456",
    role: "estudiante",
    semester: "2026-1",
    pqrs: [
      {
        id: "pqrs-005",
        status: "resuelta",
        type: "Reclamo",
        description: "Problemas con el acceso a la plataforma institucional.",
        sentTo: "ana@unab.edu.co",
      },
    ],
  },
  {
    id: "user-005",
    name: "Pedro Ruiz",
    email: "pedro@unab.edu.co",
    password: "pedro789",
    role: "estudiante",
    semester: "2026-1",
    pqrs: [
      {
        id: "pqrs-006",
        status: "enviada",
        type: "Queja",
        description:
          "Problemas con la visualización de notas en el sistema académico.",
        sentTo: "carlos@unab.edu.co",
      },
    ],
  },
];

export const findUserById = (id) => USERS.find((user) => user.id === id);
