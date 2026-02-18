import { useState } from "react";
import logo from "../../assets/logo_vaca.png";
import { login } from "./auth/auth.api";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);

      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        <html class="h-full bg-gray-900">
        <body class="h-full">
      */}

      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} alt="Your Company" class="mx-auto h-30 w-auto" />
          <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-white">
            Ingresa con tu cuenta
          </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} class="space-y-6">
            <div>
              <label
                for="Login"
                class="block text-sm/6 font-medium text-gray-100"
              >
                username
              </label>
              <div class="mt-2">
                <input
                  id="login"
                  type="login"
                  name="login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autocomplete="login"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-100"
                >
                  Contraseña
                </label>
                <div class="text-sm">
                  <a
                    href="#"
                    class="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Ingresando..." : "Ingresar Sesión"}
              </button>
            </div>

            <div className="text-sm">
              <Link
                to="/register"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
