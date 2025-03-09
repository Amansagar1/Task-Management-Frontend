import React from "react";
import dayjs from "dayjs"; 

const TaskCard = ({ task }) => {
  const { title, status, priority, dueDate } = task;

  const statusLabel =
    status === "Completed" ? (
      <span className="text-green-600 text-sm font-medium">✅ Completed</span>
    ) : (
      <span className="text-yellow-600 text-sm font-medium">⏳ Pending</span>
    );

  const priorityColor =
    priority === "High"
      ? "bg-red-100 text-red-600"
      : priority === "Medium"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div className="bg-gray-50 p-4 rounded-lg border flex justify-between items-start shadow-sm hover:shadow-md transition">
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <div className="text-sm text-gray-600 mb-1">{statusLabel}</div>
        {dueDate && (
          <div className="text-xs text-gray-500">
            Due: {dayjs(dueDate).format("MMM D, YYYY")}
          </div>
        )}
      </div>
      <span
        className={`px-2 py-1 text-xs rounded font-semibold ${priorityColor}`}
      >
        {priority}
      </span>
    </div>
  );
};

export default TaskCard;
