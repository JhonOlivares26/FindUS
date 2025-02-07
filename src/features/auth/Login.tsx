import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/users/user/login/", {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log("Login exitoso");
      navigate("/home");

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Credenciales inválidas");
    }
  };

  return (
    <div className="bg-white">
      <form onSubmit={handleSubmit} className="flex min-h-screen">
        <div className="flex flex-row w-full">
          {/* Sidebar */}
          <div className="hidden lg:flex flex-col justify-between bg-[#143C3A] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg w-1/3">
            <div className="flex items-center justify-start space-x-3">
              <span className="bg-black rounded-full w-8 h-8"></span>
              <a href="/register" className="font-medium text-xl text-white">FindUs</a>
            </div>
            <div className="space-y-5">
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold text-white">
                Entra en tu cuenta y descubre nuevas conexiones
              </h1>
              <p className="text-lg text-white">
                ¿No tienes una cuenta?{" "}
                <a href="/register" className="underline font-semibold">
                  Crea una cuenta aquí
                </a>
              </p>
            </div>
            <p className="font-medium text-white">© 2024 FindUs</p>
          </div>

          {/* Login */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 py-10 relative">
            <div className="flex lg:hidden justify-between items-center w-full py-4">
              <div className="flex items-center justify-start space-x-3">
                <span className="bg-black rounded-full w-6 h-6"></span>
                <a href="#" className="font-medium text-lg">FindUs</a>
              </div>
              <div className="flex items-center space-x-2">
                <span>¿Aún no eres miembro?</span>
                <a href="/register" className="underline font-medium text-[#070eff]">
                  ¡Crea una cuenta aquí!
                </a>
              </div>
            </div>

            {/* Login box */}
            <div className="flex flex-1 flex-col justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  Iniciar sesión en la cuenta
                </h2>
                <p className="text-md md:text-xl text-black">Regístrate o inicia sesión</p>
              </div>

              <div className="flex flex-col max-w-md space-y-5">
                {/* Email input */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Correo electrónico:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ingresa tu correo electrónico"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-teal-800"
                    required
                  />
                </div>

                {/* Password input */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingresa tu contraseña"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-teal-800"
                    required
                  />
                </div>

                {/* Mostrar mensaje de error */}
                {error && <p className="text-red-500">{error}</p>}

                <button
                  type="submit"
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white hover:bg-black hover:text-white"
                >
                  Iniciar sesión
                </button>

                <div className="flex justify-center items-center my-4">
                  <span className="w-full border border-black"></span>
                  <span className="px-4 text-black">O</span>
                  <span className="w-full border border-black"></span>
                </div>

                <button
                  className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-white text-black hover:bg-black hover:text-white"
                >
                  Inicia sesión con...
                </button>

                <a href="/recoverPassword" className="flex justify-center items-center w-full">
                  <p className="text-center text-sm text-gray-500 mt-4">
                    <span className="underline">¿Olvidaste tu contraseña?</span>
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
