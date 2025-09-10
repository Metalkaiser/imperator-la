"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo_light from "@P/brand/logo_banner_light.webp";
import logo_dark from "@P/brand/logo_banner_dark.webp";
import { useAuth } from "../context/authContext";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    try {
      const result = await login(email, password);
      if (result && !result.success) {
        setError(result.message || "Error al iniciar sesión");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
    }
  };

  return (
    <article className="flex flex-col items-center h-screen">
      <div className="flex flex-col w-1/2 md:w-1/6 text-center my-5 h-1/2 place-content-evenly">
        <Image src={logo_light} alt="Logo" className="dark:hidden w-1/2 mx-auto" />
        <Image src={logo_dark} alt="Logo" className="hidden dark:block w-1/2 mx-auto" />
        <h1 className="dark:text-white text-xl mt-2">Administración de inventario</h1>
      </div>
      <form className="flex flex-col justify-center w-2/3 md:w-1/3 xl:w-1/5" onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
        <input
          className="p-2 rounded-md mt-2 dark:bg-gray-800 dark:caret-white dark:text-white outline outline-1 dark:outline-0"
          type="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 rounded-md mt-2 dark:bg-gray-800 dark:caret-white dark:text-white outline outline-1 dark:outline-0"
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white bg-red-500 p-3 rounded-md my-4 font-semibold" type="submit">
          Iniciar sesión
        </button>
        {error && <p className="text-red-600 text-center font-bold">{error}</p>}
      </form>
    </article>
  );
}