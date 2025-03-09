import Endpoints from "./TaskEndpoint";



// Login API
export const login = (credentials) => {
    return fetch(Endpoints.LOGIN(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            return data;
        })
        .catch((error) => console.error("Login Error:", error));
};

export const register = (userData) => {
    return fetch(Endpoints.REGISTER(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
        .then((res) => res.json())
        .catch((error) => console.error("Registration Error:", error));
};

// Create Task
export const createTask = (taskData) => {
    return fetch(Endpoints.TASKS(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
    })
        .then((res) => res.json())
        .catch((error) => console.error("Create Task Error:", error));
};

// Update Task ID
export const updateTask = (id, taskData) => {
    return fetch(Endpoints.TASK(id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
    })
        .then((res) => res.json())
        .catch((error) => console.error("Update Task Error:", error));
};

// Delete a Task
export const deleteTask = (id) => {
    return fetch(Endpoints.DELETE_TASK(id), {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Delete Task Error:", error));
};

// Fetch All Tasks
export const getTasks = async () => {
    try {
        const response = await fetch(Endpoints.GET_TASKS(), {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        return await response.json();
    } catch (error) {
        console.error("Get Tasks Error:", error);
        throw error;
    }
};

// Fetch Tasks by Category
export const getTasksByCategory = (category) => {
    return fetch(Endpoints.GET_CATEGORY(category), {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Get Tasks by Category Error:", error));
};

// Fetch Tasks by Status
export const getTasksByStatus = (status) => {
    return fetch(Endpoints.GET_STATUS(status), {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Get Tasks by Status Error:", error));
};

// Get Summary Data
export const getSummary = () => {
    return fetch(Endpoints.GET_SUMMARY(), {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Get Summary Error:", error));
};