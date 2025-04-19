import React, { useEffect, useState } from "react";
import {
  getProvincias,
  getLocalidades,
  Provincia,
  Localidad,
} from "../api/Registro";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaMapMarkedAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"; // asegúrate de usar react-router-dom
import "../css/Register.css";

const Register: React.FC = () => {
  const [provincias, setProvincias] = useState<Provincia[]>([]);
  const [localidades, setLocalidades] = useState<Localidad[]>([]);
  const [selectedProvincia, setSelectedProvincia] = useState<string>("");
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formVisible, setFormVisble] = useState<boolean>(false);
  const navigate = useNavigate();

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
    console.log("Form Data:", {
      province: selectedProvincia,
      city: selectedLocalidad,
      name,
      email,
      password,
    });
  };

  const toggleForm = () => setFormVisble((prev) => !prev);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-5xl sm:text-6xl text-center mb-10 title-special text-animated-gradient">
        REGISTER
      </h1>

      <div
        className="flex justify-center mb-6 cursor-pointer"
        onClick={toggleForm}
      >
        {formVisible ? (
          <FaChevronUp className="text-orange-500 text-4xl arrow-bounce" />
        ) : (
          <FaChevronDown className="text-orange-500 text-4xl arrow-bounce" />
        )}
      </div>

      <div
        className={`transition-all duration-700 ease-in-out overflow-hidden ${
          formVisible ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-lg space-y-5 w-full max-w-md"
        >
          <div className="flex items-center border-b border-white/40 pb-2">
            <FaUser className="text-white/70 mr-3" />
            <input
              type="text"
              className="w-full bg-transparent border-none outline-none placeholder-white/70 text-white"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="flex items-center border-b border-white/40 pb-2">
            <FaLock className="text-white/70 mr-3" />
            <input
              type="password"
              className="w-full bg-transparent border-none outline-none placeholder-white/70 text-white"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border-b border-white/40 pb-2">
            <FaMapMarkedAlt className="text-white/70 mr-3" />
            <select
              className="w-full bg-transparent text-white/90 border-none outline-none"
              value={selectedProvincia}
              onChange={(e) => setSelectedProvincia(e.target.value)}
            >
              <option className="text-black" value="">
                Select a province
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

          <div className="flex items-center border-b border-white/40 pb-2">
            <FaMapMarkedAlt className="text-white/70 mr-3" />
            <select
              className="w-full bg-transparent text-white/90 border-none outline-none"
              disabled={!selectedProvincia}
              value={selectedLocalidad}
              onChange={(e) => setSelectedLocalidad(e.target.value)}
            >
              <option className="text-black" value="">
                Select a city
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

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Register
          </button>

          <div className="text-center text-white/70 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </div>

          <div className="flex items-center justify-center mt-4">
            <button
              type="button"
              className="flex items-center gap-2 bg-white text-black font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
