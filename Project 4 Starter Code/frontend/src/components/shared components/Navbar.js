import React from "react";
import { Link } from "react-router-dom";
// import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBFooter,
} from "mdb-react-ui-kit";
const Navbar = () => {
  const { isLogged, token } = useContext(UserContext);

  return (
   <>
   
    <MDBNavbar sticky light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand className="Brand" href="#">
          SAKAN
        </MDBNavbarBrand>

        <div >
          {token ? (
            <div>
              <nav aria-label="breadcrumb">
                <MDBBreadcrumb className="BreadcrumbItem">
                  <Link to={"/Dashboard"}>
                    <MDBBreadcrumbItem>
                      <a href="#">Dashboard</a>
                    </MDBBreadcrumbItem>
                  </Link>
                  <Link to={"/AddPost"}>
                    <MDBBreadcrumbItem>
                      <a href="#">Add New Post</a>
                    </MDBBreadcrumbItem>
                  </Link>
                  <Link to={"/Logout"}>
                    <MDBBreadcrumbItem>
                      <a href="#">Logout</a>
                    </MDBBreadcrumbItem>
                  </Link>
                </MDBBreadcrumb>
              </nav>
            </div>
          ) : (
            <div>
              <nav aria-label="breadcrumb">
                <MDBBreadcrumb className="BreadcrumbItem">
                  <Link to={"/Login"}>
                    <MDBBreadcrumbItem>
                      <a href="#">Login</a>
                    </MDBBreadcrumbItem>
                  </Link>
                  <Link to={"/Register"}>
                    <MDBBreadcrumbItem>
                      <a href="#">Register</a>
                    </MDBBreadcrumbItem>
                  </Link>
                </MDBBreadcrumb>
              </nav>
            </div>
          )}
        </div>
      </MDBContainer>
    </MDBNavbar>


   
    </>
  );
};

export default Navbar;
