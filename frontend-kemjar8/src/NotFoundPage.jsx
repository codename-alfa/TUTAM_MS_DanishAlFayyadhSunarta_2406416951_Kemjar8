import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black-10 text-white px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-white mb-2">404</h1>
        <p className="text-2xl font-semibold text-white">Page Not Found</p>
        <p className="text-white-20 mt-3 max-w-md mx-auto">
          The page you’re trying to reach doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-black-30 hover:bg-white hover:text-black text-white font-medium rounded-xl transition-all duration-300 shadow-sm"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
