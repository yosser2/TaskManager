import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<{ access_token: string }>(
        "http://localhost:3000/auth/login",
        { username, password }
      );
      localStorage.setItem("token", res.data.access_token);
      setToken && setToken(res.data.access_token); // update token si fourni
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Nom d'utilisateur ou mot de passe invalide");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">Connexion</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-purple-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded transition"
        >
          Se connecter
        </button>
        <p className="text-center text-gray-500">
          Pas encore inscrit ?{" "}
          <a href="/register" className="text-purple-500 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
