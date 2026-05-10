"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "conectatech_user";

const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Cargar el usuario desde localStorage al montar el componente, con manejo de errores y deferimiento para evitar setState síncrono dentro del efecto
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // defer state updates to avoid synchronous setState inside effect
      setTimeout(() => {
        try {
          if (raw) setUser(JSON.parse(raw));
        } catch (e) {}
        setHydrated(true);
      }, 0);
    } catch (e) {
      setTimeout(() => setHydrated(true), 0);
    }
  }, []);

  // Persiste el usuario en localStorage cada vez que cambia, pero solo después de que el estado se ha hidratado para evitar inconsistencias entre el estado y el almacenamiento
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
  }, [user, hydrated]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
