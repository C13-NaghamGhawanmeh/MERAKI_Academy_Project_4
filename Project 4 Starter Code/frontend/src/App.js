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
import PostDetails from "./components/shared components/PostDetails";
import "antd/dist/reset.css";
import Favorites from "./components/shared components/Favorites";
export const UserContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));
  const [centredModal, setCentredModal] = useState(false);
  const [centredModal2, setCentredModal2] = useState(false);
  const [userName, setuserName] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [posts, setPosts] = useState();
  const [searchTitle, setsearchTitle] = useState("");
  const [isClickedToAddPost, setisClickedToAddPost] = useState(false);

  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        isLogged,
        setIsLogged,
        posts,
        setPosts,
        centredModal,
        setCentredModal,
        isClickedToAddPost,
        setisClickedToAddPost,
        userName,
        setuserName,
        userId,
        setUserId,
        isClickedToUpdate,
        setIsClickedToUpdate,
        centredModal2,
        setCentredModal2,
        role,
        setRole,
        searchTitle,
        setsearchTitle,
      }}
    >
      <div className="App">
        {/* <Test/> */}
        <Navbar />
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/PostDetails" element={<PostDetails />} />
          <Route path="/PostDetails/:id" element={<PostDetails />} />
          <Route path="/Favorites" element={<Favorites />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;
