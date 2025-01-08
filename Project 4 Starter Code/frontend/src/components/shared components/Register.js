import React, { useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

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
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col="6" className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/000/619/126/non_2x/vector-house-home-buildings-logo-icons-template.jpg"
                style={{ width: "300px" }}
                alt="logo"
              />
              {/* <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4> */}
            </div>
            <p>Create an account</p>
            <MDBInput
              wrapperClass="mb-4"
              label="User Name"
              id="form1"
              type="text"
              onChange={changeUserName}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form2"
              type="email"
              onChange={changeEmail}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form3"
              type="password"
              onChange={changePassword}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn
                className="mb-4 w-100 gradient-custom-2"
                onClick={register}
              >
                Register
              </MDBBtn>
              {isRegistered && <p className="success1">{response.data.message}</p>}
              {isError && <p className="failed1">{error.response.data.message}</p>}
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
             
                <p className="mb-0">Already have an account?</p>
                <MDBBtn outline className="mx-2" color="warning" onClick={()=>{navigate("/")}}>
                  Login
                </MDBBtn>
              </div>
            </div>
          </div>
        </MDBCol>

        <MDBCol col="6" className="mb-5">
          <div
            className="d-flex flex-column  justify-content-center gradient-custom-2  mb-4"
            style={{ height: "550px", borderRadius: "20px" }}
          >
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">
                There’s old way to lease a home, then there’s our way.
              </h4>
              <p class="big mb-0">
                Welcome to SAKAN! Whether you're searching for the perfect
                apartment or looking to rent out your property, we make the
                process simple, secure, and efficient. Explore detailed
                listings, connect with property owners, and manage everything
                effortlessly in one place.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
