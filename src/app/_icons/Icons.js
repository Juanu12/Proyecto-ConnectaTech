function IconRadicar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="3" width="14" height="12" rx="2" />
      <path d="M6 7h6M6 10h4" />
    </svg>
  );
}
function IconConsultar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="8" cy="8" r="5" />
      <path d="M13 13l2.5 2.5" />
    </svg>
  );
}
function IconEstado() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M9 6v3.5l2.5 1.5" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3" />
      <path d="M12 12l3-3-3-3M15 9H7" />
    </svg>
  );
}

export const ICONS = {
  radicar: <IconRadicar />,
  consultar: <IconConsultar />,
  estado: <IconEstado />,
  logout: <IconLogout />,
};
