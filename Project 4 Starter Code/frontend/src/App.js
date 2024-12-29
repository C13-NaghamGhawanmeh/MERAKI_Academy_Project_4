import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/shared components/Register";
import Login from "./components/shared components/Login";
import Navbar from "./components/shared components/Navbar";
import { createContext, useState } from "react";

export const UserContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  return (
    <UserContext.Provider value={{ token, setToken, isLogged, setIsLogged }}>
      <div className="App">
        <Register />
        <Login />
        {/* <Navbar /> */}
        {/* <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} /> */}
        {/* <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Logout" element={<Logout />} /> */}
        {/* </Routes> */}
      </div>
    </UserContext.Provider>
  );
};

export default App;
