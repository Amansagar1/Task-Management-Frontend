import React, { useState } from "react";
import { createTask } from "../services/TaskController";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const CreateTask = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (form.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!form.category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required.";
    } else {
      const selectedDate = new Date(form.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
      if (selectedDate < today) {
        newErrors.dueDate = "Due date must be in the future.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
    //   toast.error("Please fix the form errors.");
      return;
    }

    try {
      await createTask(form);
    //   toast.success("Task created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-10">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full p-2 border rounded"
        ></textarea>

        <div>
          <input
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div>
          <input
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
