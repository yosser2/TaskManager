import React, { useState } from "react";
import { Task } from "./types";
import axios from "axios";

interface TaskProps {
  task: Task;
  token: string | null;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, token, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = async () => {
    if (!token) return alert("Vous devez être connecté pour modifier une tâche.");
    if (newTitle.trim() === "") return;

    try {
      await axios.put(
        `http://localhost:3000/tasks/${task.id}`,
        { title: newTitle, completed: task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(task.id, newTitle);
      setIsEditing(false);
    } catch (err: any) {
      console.error("Erreur modification:", err.response || err);
      alert("Erreur : impossible de modifier la tâche.");
    }
  };

  const handleToggle = async () => {
    if (!token) return alert("Vous devez être connecté pour changer le statut d'une tâche.");
    try {
      await axios.put(
        `http://localhost:3000/tasks/${task.id}`,
        { title: task.title, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onToggle(task.id);
    } catch (err: any) {
      console.error("Erreur toggle:", err.response || err);
      alert("Erreur : impossible de changer le statut de la tâche.");
    }
  };

  const handleDelete = async () => {
    if (!token) return alert("Vous devez être connecté pour supprimer une tâche.");
    try {
      await axios.delete(`http://localhost:3000/tasks/${task.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(task.id);
    } catch (err: any) {
      console.error("Erreur DELETE:", err.response || err);
      alert("Erreur : impossible de supprimer la tâche.");
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-2 hover:bg-purple-50 transition">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="w-5 h-5 accent-purple-500"
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            autoFocus
            className="border-b border-purple-300 focus:outline-none focus:border-purple-500 flex-1 p-1"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
          >
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-purple-700 text-white px-3 py-1 rounded hover:bg-purple-600 transition"
          >
            Modifier
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
