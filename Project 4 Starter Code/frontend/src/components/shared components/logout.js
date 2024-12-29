import React, { useContext } from "react";

import Login from "../shared components/Login"
import { UserContext } from "../../App";
const Logout = () => {
  const { setIsLogged, setToken } = useContext(UserContext);
  setToken(null);
  setIsLogged(false);
  localStorage.clear();
  return <Login />;
};

export default Logout;
