import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./actions/auth";
import netlabLogo from "./assets/netlab2.svg";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(cleanUsername)) {
      setMessage({
        text: "Username must be 3-30 alphanumeric characters.",
        type: "error",
      });
      return;
    }

    if (
      cleanPassword.length < 3 ||
      cleanPassword.length > 64 ||
      /('|--|;|\/\*|\*\/)/.test(cleanPassword)
    ) {
      setMessage({
        text: "Invalid password format.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser(cleanUsername, cleanPassword);

      if (Array.isArray(data?.user) && data.user.length === 1) {
        localStorage.setItem("userData", JSON.stringify(data.user[0]));
        navigate("/home");
      } else {
        setMessage({
          text: "Invalid authentication response.",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black-10 text-gray-100">
      {/* Left side - Branding / Info */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-black-15 p-10 text-center relative overflow-hidden">
        {/* Optional subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black-10 to-black-20 opacity-40 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <img
            src={netlabLogo}
            alt="NetLab Logo"
            className="w-20 h-20 md:w-24 md:h-24 mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Net&YahooLab
          </h1>
          <p className="text-gray-300 max-w-md leading-relaxed mb-6">
            Welcome to the <span className="text-white font-semibold">Network Laboratory</span> SQL Injection Challenge.
            <br />
            Please refer to the guidance document below before you begin.
          </p>
          <a
            href="https://docs.google.com/document/d/12CzZee1XJcJPdrmHoGMzYsUu6cLr5HVmRMBy3Wm6Xa8/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-6 py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition duration-300"
          >
            View Guidance Document
          </a>
        </div>
      </div>


      {/* Right side - Login Form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 bg-black-25 p-8 md:p-16 rounded-t-2xl md:rounded-none shadow-2xl">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">
            Sign in
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={30}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 bg-black-30 border border-black rounded-md text-gray-100 placeholder-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={64}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 bg-black-30 border border-black rounded-md text-gray-100 placeholder-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black-25 transition duration-300 disabled:bg-white disabled:text-black flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Logging in</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {message.text && (
            <div className="mt-6 text-center">
              <p
                className={`text-sm ${message.type === "error"
                  ? "text-red-400"
                  : "text-green-400"
                  }`}
              >
                {message.text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
