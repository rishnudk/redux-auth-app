import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";





function App() {

  const [user, setUser] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    profilePicture: "https://via.placeholder.com/150",
  });


  return (
  
      <Routes>
       

      
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/profile" element={<Profile user={user} />} />
     
    
     
      </Routes>

  
 
  );
}

export default App;
