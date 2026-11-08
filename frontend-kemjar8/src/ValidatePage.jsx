import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateFlags } from "./actions/flagActions";

function ValidatePage() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState("");
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userData"));
      const parsedId = Number(storedUser?.id);
      if (
        storedUser &&
        Number.isInteger(parsedId) &&
        parsedId > 0 &&
        typeof storedUser.name === "string"
      ) {
        setUserId(parsedId);
        setUserName(storedUser.name);
      } else {
        localStorage.removeItem("userData");
        navigate("/", { replace: true });
      }
    } catch (err) {
      localStorage.removeItem("userData");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const parsedId = Number(userId);
    const cleanFlag = flag.trim();

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      setMessage({
        text: "Invalid user session. Please login again.",
        type: "error",
      });
      return;
    }

    if (!/^FLAG\{[a-zA-Z0-9_]{5,64}\}$/.test(cleanFlag)) {
      setMessage({
        text: "Invalid flag format.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const data = await validateFlags(parsedId, cleanFlag);
      const result = data?.data?.[0];

      if (result) {
        setMessage({
          text: `✅ Flag validated successfully for user ID ${result.user_id} Congrats!`,
          type: "success",
        });
      } else {
        setMessage({
          text: "❌ Invalid flag",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({
        text: err.message || "Failed to validate flag.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black-10 text-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-black-25 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white">
          Validate Your Flag 🏁
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p>
              Hello {userName}! your user id is <strong>{userId}</strong>
            </p>
            <p className="mb-5">
              Please Submit your flag!
            </p>
            <label htmlFor="flag" className="block mb-2 text-sm font-medium text-gray-300">
              Flag
            </label>
            <input
              type="text"
              id="flag"
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              maxLength={64}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 bg-black-30 border border-black rounded-md text-white placeholder-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              placeholder="Enter your flag"
            />
          </div>

          <div className="space-y-3">
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
                  <span>Checking Flag..</span>
                </>
              ) : (
                "Login"
              )}
            </button>

            <button
              onClick={handleBack}
              className="w-full px-4 py-2 font-bold text-white bg-black-10 rounded-md hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 disabled:bg-gray-500"
            >
              Back
            </button>
          </div>
        </form>

        {message.text && (
          <div className="mt-6 text-center">
            <p
              className={`text-sm whitespace-pre-line ${message.type === "error" ? "text-red-400" : "text-green-400"
                }`}
            >
              {message.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ValidatePage;