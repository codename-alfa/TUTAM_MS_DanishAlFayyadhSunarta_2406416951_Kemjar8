import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import CheckPasswordPage from "./CheckPassword";
import ValidatePage from "./ValidatePage";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function ProtectedRoute({ children }) {
  const userData = localStorage.getItem("userData");
  if (!userData) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function LoggedUser({ children }) {
  const userData = localStorage.getItem("userData");
  if (userData) {
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
