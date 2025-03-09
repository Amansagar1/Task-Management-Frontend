import React, { useEffect, useState } from "react";
import { getTasks, deleteTask, updateTask } from "../services/TaskController";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
// import { toast, Toaster } from "react-hot-toast";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [errors, setErrors] = useState({});
  const [filters, setFilters] = useState({ priority: "", status: "", category: "" });
  const { search } = useOutletContext();

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(id);
      // toast.success("Task deleted successfully!");
      getTasks().then(setTasks);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!editedTask.title?.trim()) newErrors.title = "Title is required";
    if (!editedTask.category?.trim()) newErrors.category = "Category is required";
    if (!editedTask.dueDate) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    await updateTask(editingTaskId, editedTask);
    // toast.success("Task updated successfully!");
    setEditingTaskId(null);
    setEditedTask({});
    setErrors({});
    getTasks().then(setTasks);
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditedTask({
      title: task.title || "",
      description: task.description || "",
      category: task.category || "",
      priority: task.priority || "Medium",
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : "",
      status: task.status || "Pending",
    });
    setErrors({});
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filters.priority ? task.priority === filters.priority : true;
    const matchesStatus = filters.status ? task.status === filters.status : true;
    const matchesCategory = filters.category ? task.category === filters.category : true;
    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  const uniqueCategories = [...new Set(tasks.map((t) => t.category))];

  return (
    <div className="p-6">
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>

 
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <div key={task._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className={`mb-1 p-2 border rounded w-full ${errors.title && "border-red-500"}`}
                />
                {errors.title && <p className="text-red-500 text-sm mb-1">{errors.title}</p>}

                <textarea
                  placeholder="Description"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={editedTask.category}
                  onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                  className={`mb-1 p-2 border rounded w-full ${errors.category && "border-red-500"}`}
                />
                {errors.category && <p className="text-red-500 text-sm mb-1">{errors.category}</p>}

                <select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <input
                  type="date"
                  value={editedTask.dueDate}
                  onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                  className={`mb-1 p-2 border rounded w-full ${errors.dueDate && "border-red-500"}`}
                />
                {errors.dueDate && <p className="text-red-500 text-sm mb-1">{errors.dueDate}</p>}

                <select
                  value={editedTask.status}
                  onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                  className="mb-2 p-2 border rounded w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-1"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600"><span className="font-semibold">Description:</span> {task.description || "N/A"}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Category:</span> {task.category || "N/A"}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Priority:</span> {task.priority}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Due Date:</span> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={`font-medium ${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                    {task.status}
                  </span>
                </p>

                <div className="flex justify-end gap-3 mt-4">
                  <FaEdit
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    title="Edit"
                  />
                  <FaTrash
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    title="Delete"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
