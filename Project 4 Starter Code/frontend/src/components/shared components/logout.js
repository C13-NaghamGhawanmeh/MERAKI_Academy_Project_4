import React, { useContext } from "react";

import Login from "../shared components/Login"
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate()
  const { setIsLogged, setToken } = useContext(UserContext);
  setToken(null);
  setIsLogged(false);
  localStorage.clear();
  navigate("/Login") 
};

export default Logout;
