import React from "react";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  const userInfo = { userName, email, password };
  const changeUserName = (e) => {
    setUserName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const register = () => {
    console.log(userInfo);

    axios
      .post("http://localhost:5000/users/register", userInfo)
      .then((res) => {
        setIsRegistered(true);
        const data = res;
        setResponse(data);
        console.log(response);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err;

        setIsRegistered(false);
        setIsError(true);
        setError(errMsg);
      });
  };
  return (
    <>
      <h1>Register</h1>
      <div className="Register">
        <input
          className="input1"
          type="text"
          placeholder="User Name"
          onChange={changeUserName}
        />
        <input
          className="input1"
          type="email"
          placeholder="Email"
          onChange={changeEmail}
        />
        <input
          className="input1"
          type="password"
          placeholder="Password"
          onChange={changePassword}
        />
        <button className="Btn1" onClick={register}>
          Register
        </button>
      </div>
      {isRegistered && <p className="success1">{response.data.message}</p>}
      {isError && <p className="failed1">{error.response.data.message}</p>}
    </>
  );
};

export default Register;
