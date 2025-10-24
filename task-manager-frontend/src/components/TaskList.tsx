import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { Task } from "./types";
import { useNavigate } from "react-router-dom";

interface TaskListProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const TaskList: React.FC<TaskListProps> = ({ setToken }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get<Task[]>("http://localhost:3000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err: any) {
        console.error("Erreur fetch tasks:", err.response || err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login");
        } else {
          alert("Erreur : impossible de récupérer les tâches.");
        }
      }
    };
    fetchTasks();
  }, [token, navigate, setToken]);

  const handleAdd = async (task: Task) => {
    if (!token) return alert("Vous devez être connecté pour ajouter une tâche.");
    try {
      const res = await axios.post<Task>("http://localhost:3000/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]);
    } catch (err: any) {
      console.error("Erreur add task:", err.response || err);
      alert("Erreur : impossible d'ajouter la tâche.");
    }
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggle = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleUpdate = (id: number, newTitle: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Mes Tâches</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Déconnexion
          </button>
        </div>

        <div className="mb-6">
          <TaskForm onAdd={handleAdd} />
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune tâche pour l'instant</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                token={token}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
