
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { getTasks } from "../services/TaskController";
import Footer from "../Components/Footer";
const DashboardLayout = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    const [search, setSearch] = useState("");
    return (
        <>
        <div className="flex flex-col h-screen">
           <div className="flex h-full">
           <Sidebar />
            <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                <Header onSearch={setSearch} tasks={tasks} />
                <Outlet context={{ search }} />
               
            </div>
           </div>
           <div className="fixed bottom-0 w-full">
         <Footer />
         </div>
         
        </div>
        
         </>
    );
};

export default DashboardLayout;
