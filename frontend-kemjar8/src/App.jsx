import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CheckPasswordPage from "./CheckPassword";
import ValidatePage from "./ValidatePage";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function getValidUserSession() {
  const raw = localStorage.getItem("userData");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const id = Number(parsed?.id);
    if (
      parsed &&
      Number.isInteger(id) &&
      id > 0 &&
      typeof parsed.username === "string" &&
      /^[a-zA-Z0-9_]{3,30}$/.test(parsed.username)
    ) {
      return parsed;
    }
  } catch (err) {
    // invalid JSON in localStorage
  }
  localStorage.removeItem("userData");
  return null;
}

function ProtectedRoute({ children }) {
  const user = getValidUserSession();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function LoggedUser({ children }) {
  const user = getValidUserSession();
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
        <Route
          path="/"
          element={
            <LoggedUser>
              <LoginPage />
            </LoggedUser>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/check-password"
          element={
            <ProtectedRoute>
              <CheckPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/validate-flag"
          element={
            <ProtectedRoute>
              <ValidatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
