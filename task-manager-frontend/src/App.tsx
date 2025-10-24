import React from "react";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Manager</h1>
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <TaskList />
      </div>
    </div>
  );
};

export default App;
