import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/users/user/register/",
        {
          email: formData.email,
          name: formData.name,
          last_name: formData.last_name,
          phone: formData.phone,
          password: formData.password,
          username: formData.username,
        }
      );
      console.log('Registro exitoso', response.data);
      alert("Registro exitoso");
      navigate('/login');
    } catch (err) {
      setError("Hubo un error al registrar el usuario.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Crear cuenta</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["email", "name", "last_name", "username", "phone", "password", "confirmPassword"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block font-medium text-gray-700">
              {field === "confirmPassword" ? "Confirmar contraseña" : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes("password") ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required={field !== "phone"}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
