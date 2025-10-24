import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Mettre à jour le token si changement dans localStorage
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Route protégée
  const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return token ? <>{children}</> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login setToken={setToken} />} />
        <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register setToken={setToken} />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskList setToken={setToken} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default App;
