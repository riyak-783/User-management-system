import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import UserTable from "./UserTable";
import UserDetail from "./UserDetail";
import { ToastContainer } from 'react-toastify';
import { decorate } from "react-toastify/addons/use-notification-center";

const App = () => {
  return (
    <div className="bg-white">
      <Router>
       <ToastContainer />
      <Routes> {/* Change Switch to Routes */}
        <Route path="/" element={<UserTable />} /> {/* Use element prop instead of component */}
        <Route path="/user/:id" element={<UserDetail />} /> {/* Use element prop instead of component */}
      </Routes>
    </Router>
    </div>
    
  );
};

export default App; 