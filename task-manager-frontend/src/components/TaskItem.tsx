import React, { useState } from "react";
import { Task } from "./types";

interface TaskProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({ task, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim() === "") return;
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded shadow mb-2">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4"
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-1 rounded flex-1"
          />
        ) : (
          <span className={task.completed ? "line-through text-gray-400" : ""}>
            {task.title}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Modifier
          </button>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
