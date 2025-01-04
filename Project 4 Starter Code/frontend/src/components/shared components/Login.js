import React, { useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBFooter,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const { token, setToken, isLogged, setIsLogged } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const userInfo = { email, password };

  const changeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
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
            <p>Please login to your account</p>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              onChange={changeEmail}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              onChange={changePassword}
            />

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={login}>
                Sign in
              </MDBBtn>
              {isError && (
                <p className="Failed">{error.response.data.message}</p>
              )}
              {isLogged && navigate("/Dashboard")}
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
              <br />
              <br />
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
                <MDBBtn
                  outline
                  className="mx-2"
                  color="warning"
                  onClick={() => {
                    navigate("/Register");
                  }}
                >
                  Register
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
                Welcome to SAKAN! Whether you're searching for
                the perfect apartment or looking to rent out your property, we
                make the process simple, secure, and efficient. Explore detailed
                listings, connect with property owners, and manage everything
                effortlessly in one place.
              </p>
            </div>
            {/* <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter> */}
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
