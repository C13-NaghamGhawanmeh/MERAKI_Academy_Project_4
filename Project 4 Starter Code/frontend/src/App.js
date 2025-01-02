import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/shared components/Register";
import Login from "./components/shared components/Login";
import Navbar from "./components/shared components/Navbar";
import { createContext, useState } from "react";
import Dashboard from "./components/shared components/Dashboard";
import AddPost from "./components/shared components/AddPost";
import Logout from "./components/shared components/logout";
import Test from "./components/shared components/Test";
import 'antd/dist/reset.css';
export const UserContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const [posts, setPosts] = useState();

  return (
  
    <UserContext.Provider
      value={{ token, setToken, isLogged, setIsLogged, posts, setPosts }}
    >
      <div className="App">
        <Test/>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </div>
    </UserContext.Provider>

  );
};

export default App;
