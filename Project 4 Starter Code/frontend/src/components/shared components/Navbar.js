import React from "react";
import { Link} from "react-router-dom"
// import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../App";
const Navbar = () => {
  const { isLogged ,token} = useContext(UserContext);

  return (
    <div className="Navbar">
      {token ? 
        <div>
          <Link to={"/Dashboard"}>Dashboard</Link>
          <Link to={"/AddPost"}>Add New Post</Link>
          <Link to={"/Logout"}>Logout</Link>
        </div>
       : 
        <div>
          <Link to={"/Register"}>Register</Link>
          <Link to={"/Login"}>Login</Link>
        </div>
      }
    </div>
  );
};

export default Navbar;