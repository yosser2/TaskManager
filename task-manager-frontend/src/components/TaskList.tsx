import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { Task } from "./types";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get<Task[]>("http://localhost:3000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  };

  const handleAdd = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch((err) => console.error(err));
  };

  const handleToggle = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    axios
      .put(`http://localhost:3000/tasks/${id}`, { ...task, completed: !task.completed })
      .then(() =>
        setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
      )
      .catch((err) => console.error(err));
  };

  const handleUpdate = (id: number, newTitle: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    axios
      .put(`http://localhost:3000/tasks/${id}`, { ...task, title: newTitle })
      .then(() =>
        setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)))
      )
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <TaskForm onAdd={handleAdd} />
      {tasks.length === 0 ? (
        <p className="text-gray-500">Aucune tâche pour l'instant</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
