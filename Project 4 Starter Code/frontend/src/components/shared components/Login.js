import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
  const { token, setToken, isLogged, setIsLogged } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const userInfo = { email, password };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const login = () => {
    setIsLogged(false);

    axios
      .post("http://localhost:5000/users/login", userInfo)
      .then((res) => {
        const data = res;
        setIsLogged(true);
        localStorage.setItem("isLogged", true);
        setResponse(data);
        console.log(res);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLogged(false);
        setIsError(true);
        setError(err);
      });
  };
  return (
    <>
      <h1>Login</h1>
      <div className="Login">
        <input
          className="input2"
          type="email"
          placeholder="Email"
          onChange={changeEmail}
        />
        <input
          className="input2"
          type="password"
          placeholder="Password"
          onChange={changePassword}
        />
        <button className="Btn2" onClick={login}>
          login
        </button>
        {isError && <p className="Failed">{error.response.data.message}</p>}
        {isLogged &&navigate("/Dashboard")}
      </div>
    </>
  );
};

export default Login;
