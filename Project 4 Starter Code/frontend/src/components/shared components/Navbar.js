import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import Test from "./Test"
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBFooter,
  MDBRow,
  MDBCol,

} from "mdb-react-ui-kit";
const Navbar = () => {
  const { isLogged, token , centredModal,setCentredModal,isClickedToAddPost, setisClickedToAddPost,userName, setuserName } = useContext(UserContext);
// const add = ()=>{
//   setCentredModal(!centredModal)
//                           <Test />
// }
  return (
    <>
      <MDBNavbar sticky light bgColor="light">
        <MDBContainer fluid>
          <div className="LogoBrand">
          <MDBNavbarBrand className="Brand" href="#">
          <img className="ImgLogo"
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1735912458/w56gfxnku52f4mirc6im.jpg"
                style={{ width: "100px" }}
                alt="logo"
              />
            SAKAN
          </MDBNavbarBrand>
          </div>
          <div>
            {token ? (
              <div>
                <nav aria-label="breadcrumb">
                  <MDBBreadcrumb className="BreadcrumbItem">
                    <Link to={"/Dashboard"}>
                      <MDBBreadcrumbItem>
                        <a href="#" style={{fontSize:"18px" ,fontFamily:"Arial, Helvetica, sans-serif"}}>Dashboard</a>
                      </MDBBreadcrumbItem>
                    </Link>
                    {/* <Link to={"/Test"}> */}
                      <MDBBreadcrumbItem>
                        <a href="#" onClick={()=>{
                          // TODO
                         
                          setCentredModal(!centredModal)
                          setisClickedToAddPost(true)
                        
                        }} style={{fontSize:"18px" ,fontFamily:"Arial, Helvetica, sans-serif"}}>Add New Post</a>
                      </MDBBreadcrumbItem>
                      {isClickedToAddPost&& <Test/>}
                    {/* </Link> */}
                    <Link to={"/Logout"}>
                      <MDBBreadcrumbItem>
                        <a href="#" style={{fontSize:"18px" ,fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bold"}}>Logout  ({userName})</a>
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
                        <a href="#" style={{fontSize:"18px" ,fontFamily:"Arial, Helvetica, sans-serif"}}>Login</a>
                      </MDBBreadcrumbItem>
                    </Link>
                    <Link to={"/Register"}>
                      <MDBBreadcrumbItem>
                        <a href="#" style={{fontSize:"18px" ,fontFamily:"Arial, Helvetica, sans-serif"}}>Register</a>
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
