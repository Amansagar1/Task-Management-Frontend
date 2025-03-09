import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/TaskController";
import { toast, Toaster } from "react-hot-toast";

const Login = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.username || form.username.trim().length < 6) {
            newErrors.username = "Username must be at least 6 characters.";
        }
        if (!form.password || form.password.length < 3) {
            newErrors.password = "Password must be at least 3 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        const response = isSignUp ? await register(form) : await login(form);
    
        if (response?.token) {
            localStorage.setItem("token", response.token);
            // toast.success(isSignUp ? "Registered successfully!" : "Login successful!");
            navigate("/dashboard");
        } else {
            toast.error("Invalid credentials. Please try again!");
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {isSignUp ? "Sign Up" : "Sign In"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 ${errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                            required
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 ${errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                                }`}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                            setIsSignUp(!isSignUp);
                            setErrors({});
                        }}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
