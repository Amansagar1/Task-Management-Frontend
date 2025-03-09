import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Header = ({ onSearch, tasks = [] }) => {
    const [searchText, setSearchText] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/");
    };

    const now = new Date();
    const dueTasks = tasks.filter((task) => {
        if (!task.dueDate || task.status === "Completed") return false;
        const taskDate = new Date(task.dueDate);
        return (
            taskDate.toDateString() === now.toDateString() ||
            taskDate.getTime() < now.getTime()
        );
    });

    return (
        <header className="relative mb-6 bg-white shadow px-4 py-3">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="flex justify-between items-center">
                {/* Title */}
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                    Task Manager
                </div>

                {/* Hamburger Icon */}
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-2xl text-gray-700 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Desktop Items */}
                <div className="hidden sm:flex items-center gap-6">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                onSearch(e.target.value);
                            }}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                    </div>

                    {/* Notifications */}
                    <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
                        <FaBell className="text-2xl text-gray-600" title="Notifications" />
                        {dueTasks.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {dueTasks.length}
                            </span>
                        )}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-lg p-4 z-50 max-h-72 overflow-y-auto">
                                <h3 className="font-semibold text-gray-700 mb-2">Due Tasks</h3>
                                {dueTasks.map((task) => (
                                    <div key={task._id} className="mb-2 p-2 border rounded text-sm">
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-gray-500 text-xs">
                                            Due: {new Date(task.dueDate).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User / Logout */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <FaUserCircle className="text-2xl text-gray-600" />
                        <span className="text-gray-700 text-sm">Hi, User</span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden mt-4 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                onSearch(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
                    </div>

                    {/* Notifications */}
                    <div className="relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
                        <div className="flex items-center gap-2">
                            <FaBell className="text-2xl text-gray-600" />
                            <span className="text-gray-700">Notifications</span>
                            {dueTasks.length > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {dueTasks.length}
                                </span>
                            )}
                        </div>
                        {showNotifications && (
                            <div className="mt-2 bg-white shadow-xl rounded-lg p-4 z-50 max-h-72 overflow-y-auto">
                                <h3 className="font-semibold text-gray-700 mb-2">Due Tasks</h3>
                                {dueTasks.map((task) => (
                                    <div key={task._id} className="mb-2 p-2 border rounded text-sm">
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-gray-500 text-xs">
                                            Due: {new Date(task.dueDate).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <FaUserCircle className="text-2xl text-gray-600" />
                        <span className="text-gray-700 text-sm">Logout</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
