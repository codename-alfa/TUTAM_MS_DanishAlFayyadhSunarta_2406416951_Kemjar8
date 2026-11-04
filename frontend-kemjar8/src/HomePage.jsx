import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            try {
                const user = JSON.parse(storedData);
                setUserName(user.name || "User");
            } catch (err) {
                console.error("Error parsing user data:", err);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/");
    };
    const handlePassCheck = () => {
        navigate("/check-password");
    }
    const handleValidateFlag = () => {
        navigate("/validate-flag");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black-10 text-gray-100">
            <h1 className="text-4xl font-bold mb-4">
                Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-kemjar-ijo to-kemjar-biru">{userName}</span> 👋
            </h1>
            <p className="mb-8 text-gray-400">You have successfully logged in.</p>
            <div className="flex flex-row">
                <button
                    onClick={handleValidateFlag}
                    className="px-6 py-2 mx-3 bg-white text-black rounded-md hover:bg-black-30 hover:text-white transition-all duration-200"
                >
                    Validate your flag!
                </button>
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 mx-3 bg-white text-black rounded-md hover:bg-black-30 hover:text-white transition-all duration-200"
                >
                    Logout
                </button>
                <button
                    onClick={handlePassCheck}
                    className="px-6 py-2 mx-3 bg-white text-black rounded-md hover:bg-black-30 hover:text-white transition-all duration-200"
                >
                    Check Your Password!
                </button>
            </div>
        </div>
    );
}

export default HomePage;
