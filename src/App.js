// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// // import TaskBoard from "./Components/TaskBoard";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   return token ? <Navigate to="/home" /> : children;
// };

// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <Routes>
//           {/* Public Routes */}
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />

//           {/* Private Routes */}
//           <Route
//             path="/home"
//             element={
//               <PrivateRoute>
//                 <Home />
//               </PrivateRoute>
//             }
//           />
//           {/* <Route
//             path="/tasks"
//             element={
//               <PrivateRoute>
//                 <TaskBoard />
//               </PrivateRoute>
//             }
//           /> */}

//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/TaskBoard";
import CreateTask from "./Pages/CreateTask";
import Login from "./Pages/Login"; // Make sure this exists
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Router>
       <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="create-task" element={<CreateTask />} />
        </Route>
      </Routes>
 
    </Router>
  );
};

export default App;

