import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPassword } from "./actions/usersActions";

function CheckPasswordPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const data = await getPassword(username, password);
            console.log(data);

            if (Array.isArray(data.response) && data.response.length > 0) {
                const entries = data.response
                    .map(
                        (item, i) =>
                            `Your username is ${item.username}, and your password is correct`
                    )
                    .join("\n");

                setMessage({
                    text: entries,
                    type: "success",
                });
            } else {
                setMessage({
                    text:
                        "Password is correct!" +
                        (data?.response?.username
                            ? ` (Username: ${data.response.username})`
                            : ""),
                    type: "success",
                });
            }
        } catch (err) {
            setMessage({ text: err.message || "Incorrect password", type: "error" });
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
                    Check Your Password!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-black-30 border border-black rounded-md text-white placeholder-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
                            placeholder="Enter username"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-black-30 border border-black rounded-md text-white placeholder-white placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent disabled:opacity-50"
                            placeholder="Enter password"
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
                                    <span>Checking Credentials..</span>
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <button
                            onClick={handleBack}
                            className="w-full px-4 py-2 font-bold text-white bg-black-10 rounded-md hover:bg-black-30 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300"
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

export default CheckPasswordPage;
