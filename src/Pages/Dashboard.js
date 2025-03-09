import React, { useEffect, useState } from "react";
import { getTasks, getSummary } from "../services/TaskController";
import TaskCard from "../Components/TaskCard";
import { Link, useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { search } = useOutletContext(); 

  useEffect(() => {
    getTasks().then(setTasks);
    getSummary().then(setSummary);
  }, []);

  const categories = [...new Set(tasks.map((task) => task.category))];

  const categoryFiltered = selectedCategory
    ? tasks.filter((task) => task.category === selectedCategory)
    : tasks;

  const filteredTasks = categoryFiltered.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const groupedByCategory = filteredTasks.reduce((acc, task) => {
    const cat = task.category || "Uncategorized";
    (acc[cat] = acc[cat] || []).push(task);
    return acc;
  }, {});

  return (
    <div className="p-4">

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Task Boards</h1>
        <Link to="/create-task">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
            + Create Task
          </button>
        </Link>
      </div>


      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 text-blue-800 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Total Tasks</h3>
            <p className="text-2xl font-bold">{summary.totalTasks}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Pending Tasks</h3>
            <p className="text-2xl font-bold">{summary.pendingTasks}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
            <p className="text-2xl font-bold">{summary.completedTasks}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">
          Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-64 p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat || "Uncategorized"}
            </option>
          ))}
        </select>
      </div>


      {Object.keys(groupedByCategory).length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No tasks found.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <div
              key={category}
              className="bg-white rounded-xl p-4 shadow-md border"
            >
              <h2 className="font-semibold text-xl text-gray-800 mb-2">
                {category}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Total Tasks: {items.length}
              </p>
              <div className="space-y-2">
                {items.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
