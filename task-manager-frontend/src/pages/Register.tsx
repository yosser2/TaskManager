import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const Register: React.FC<RegisterProps> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", { username, password });
      alert("Inscription réussie ! Connectez-vous.");
      navigate("/login");
    } catch (err) {
      alert("Erreur lors de l'inscription. Nom déjà utilisé ?");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl mb-4 text-center">Inscription</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded"
        >
          S'inscrire
        </button>
        <p className="mt-4 text-center">
          Déjà inscrit ?{" "}
          <a href="/login" className="text-purple-500 hover:underline">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
