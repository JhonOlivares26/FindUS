import React, { useState, FormEvent } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username: email,
        password: password,
      });
      localStorage.setItem("token", response.data.access_token);
      console.log("Login exitoso");
    } catch (error) {
      console.error(error);
      setErrorMessage("Credenciales inválidas");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Columna izquierda */}
      <div className="w-1/3 bg-teal-800 text-white flex flex-col justify-center items-start p-10">
        <h1 className="text-4xl font-bold mb-4 text-left">
          Entra en tu cuenta y descubre nuevas conexiones
        </h1>
        <p className="mb-8 text-lg text-left">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="underline font-semibold">
            Crea una cuenta aquí
          </a>
        </p>
        <p className="mt-auto text-sm text-left">&copy; 2024 FindUS</p>
      </div>

      {/* Columna derecha */}
      <div className="w-2/3 flex justify-center items-center bg-white">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-4">Iniciar sesión en la cuenta</h2>
          <p className="mb-4 text-gray-600">Regístrate o inicia sesión</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Correo electrónico:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                className="w-full p-2 border border-gray-300 rounded focus:outline-teal-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Contraseña:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full p-2 border border-gray-300 rounded focus:outline-teal-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
            >
              Iniciar sesión
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-sm text-gray-500">o</span>
            <hr className="w-full border-gray-300" />
          </div>
          <button className="w-full border border-black py-2 rounded font-semibold">
            Inicia sesión con...
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            <a href="/reset-password" className="underline">
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;




