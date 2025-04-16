import React, { useEffect, useState } from "react";
import {
  getProvincias,
  getLocalidades,
  Provincia,
  Localidad,
} from "../api/Registro";
import { FaUser, FaEnvelope, FaLock, FaMapMarkedAlt } from "react-icons/fa";
import "../css/Register.css";

const Register: React.FC = () => {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");

  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");

  useEffect(() => {
    const fetchProvincias = async () => {
      const provincias = await getProvincias();
      setProvincias(provincias);
    };
    fetchProvincias();
  }, []);

  useEffect(() => {
    if (selectedProvincia) {
      const fetchLocalidades = async () => {
        const localidades = await getLocalidades(selectedProvincia);
        setLocalidades(localidades);
      };
      fetchLocalidades();
    } else {
      setLocalidades([]);
    }
  }, [selectedProvincia]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del Formulario:", {
      provincia: selectedProvincia,
      localidad: selectedLocalidad,
      nombre,
      email,
      contraseña,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      {/* Título con animación */}
      <h1 className="text-5xl sm:text-6xl text-center mb-10 title-special text-animated-gradient">
        Formulario
      </h1>

      {/* Contenedor del formulario con efecto glass */}
      <div className="transparent-card w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaUser className="text-white/70 mr-3" />
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none placeholder-white/70 text-white"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaEnvelope className="text-white/70 mr-3" />
            <input
              type="email"
              className="w-full bg-transparent border-none outline-none placeholder-white/70 text-white"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaLock className="text-white/70 mr-3" />
            <input
              type="password"
              className="w-full bg-transparent border-none outline-none placeholder-white/70 text-white"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {/* Provincia */}
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaMapMarkedAlt className="text-white/70 mr-3" />
            <select
              className="w-full bg-transparent text-white/90 border-none outline-none"
              value={selectedProvincia}
              onChange={(e) => setSelectedProvincia(e.target.value)}
            >
              <option className="text-black" value="">
                Selecciona una provincia
              </option>
              {provincias.map((provincia) => (
                <option
                  className="text-black"
                  key={provincia.id}
                  value={provincia.id}
                >
                  {provincia.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Localidad */}
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaMapMarkedAlt className="text-white/70 mr-3" />
            <select
              className="w-full bg-transparent text-white/90 border-none outline-none"
              disabled={!selectedProvincia}
              value={selectedLocalidad}
              onChange={(e) => setSelectedLocalidad(e.target.value)}
            >
              <option className="text-black" value="">
                Selecciona una localidad
              </option>
              {localidades.map((localidad) => (
                <option
                  className="text-black"
                  key={localidad.id}
                  value={localidad.id}
                >
                  {localidad.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Botón */}
          <button type="submit" className="btn-registrarse">
            Registrarse
          </button>
        </form>

        {/* Flecha que late debajo del formulario */}
        <div className="flex justify-center mt-6 text-orange-500 text-4xl arrow-bounce">
          ↓
        </div>
      </div>
    </div>
  );
};

export default Register;
