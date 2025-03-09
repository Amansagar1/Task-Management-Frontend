import React, { useState } from "react";
import { FaTasks, FaHome, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(path)
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`;

    return (
        <>

            <div className="sm:hidden p-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-2xl text-gray-700 focus:outline-none"
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>


            <aside
                className={`fixed top-0 left-0 h-full bg-white shadow w-60 p-4 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:block`}
            >
                <h2 className="text-xl font-bold mb-6">Task Manager</h2>

                <nav className="space-y-2">
                    <Link to="/dashboard" className={linkClass("/dashboard")}>
                        <FaHome /> Dashboard
                    </Link>
                    <Link to="/tasks" className={linkClass("/tasks")}>
                        <FaTasks /> Tasks
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 mt-6 px-2 py-2 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </aside>


            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
