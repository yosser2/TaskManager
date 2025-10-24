import React, { useState } from "react";
import axios from "axios";
import { Task } from "./types";

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  
  // Récupérer le token JWT depuis le localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    try {
      const res = await axios.post<Task>(
        "http://localhost:3000/tasks",
        { title, completed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      onAdd(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur : impossible d'ajouter la tâche. Vérifie que tu es connecté.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche..."
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition duration-300"
      >
        Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
