import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./style.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import AddPost from "./AddPost";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdb-react-ui-kit";
const Navbar = () => {
  const {
    isLogged,
    token,
    centredModal,
    setCentredModal,
    isClickedToAddPost,
    setisClickedToAddPost,
    userName,
    setuserName,
  } = useContext(UserContext);
  // const add = ()=>{
  //   setCentredModal(!centredModal)
  //                           <Test />
  // }
  return (
    <>
      <MDBNavbar sticky light bgColor="white">
        <MDBContainer fluid>
          <div className="LogoBrand">
            <MDBNavbarBrand className="Brand" href="#">
              <img
                className="ImgLogo"
                src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1735912458/w56gfxnku52f4mirc6im.jpg"
                style={{ width: "100px" }}
                alt="logo"
              />
              SAKAN
            </MDBNavbarBrand>
          </div>
          {token && <MDBInputGroup tag="form" className="d-flex w-auto mb-3 Search">
            <input
              className="form-control Input"
              placeholder="Search"
              aria-label="Search"
              type="Search"
            />
            <MDBBtn outline color="warning">
              Search
            </MDBBtn>
          </MDBInputGroup>}
          <div>
            {token ? (
              <div>
                <nav aria-label="breadcrumb">
                  <MDBBreadcrumb className="BreadcrumbItem">
                    <Link to={"/Dashboard"}>
                      <MDBBreadcrumbItem>
                        <a
                          href="#"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                          }}
                        >
                          Home
                        </a>
                      </MDBBreadcrumbItem>
                    </Link>
                    {/* <Link to={"/Test"}> */}
                    <MDBBreadcrumbItem>
                      <a
                        href="#"
                        onClick={() => {
                          // TODO

                          setCentredModal(!centredModal);
                          setisClickedToAddPost(true);
                        }}
                        style={{
                          fontSize: "18px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        Add New Post
                      </a>
                    </MDBBreadcrumbItem>
                    {isClickedToAddPost && <AddPost />}
                    {/* </Link> */}

                    <MDBBreadcrumbItem>
                      <MDBNavbarItem>
                        <MDBDropdown>
                          <MDBDropdownToggle
                            tag="a"
                            className="nav-link"
                            role="button" style={{
                              marginRight:"15px"
                            }}
                          >
                            <MDBIcon far icon="user-circle" />
                          </MDBDropdownToggle>
                          <MDBDropdownMenu>
                            <MDBDropdownItem
                              link
                              style={{
                                fontSize: "18px",
                                fontFamily: "Arial, Helvetica, sans-serif",
                              }}
                            >
                              Account
                            </MDBDropdownItem>
                            <MDBDropdownItem link>
                              <Link to={"/Logout"}>
                                <MDBBreadcrumbItem>
                                  <a
                                    href="#"
                                    style={{
                                      fontSize: "18px",
                                      fontFamily:
                                        "Arial, Helvetica, sans-serif",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Logout ({userName})
                                  </a>
                                </MDBBreadcrumbItem>
                              </Link>
                            </MDBDropdownItem>
                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavbarItem>
                    </MDBBreadcrumbItem>
                  </MDBBreadcrumb>
                </nav>
              </div>
            ) : (
              <div>
                <nav aria-label="breadcrumb">
                  <MDBBreadcrumb className="BreadcrumbItem">
                    <Link to={"/Login"}>
                      <MDBBreadcrumbItem>
                        <a
                          href="#"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                          }}
                        >
                          Login
                        </a>
                      </MDBBreadcrumbItem>
                    </Link>
                    <Link to={"/Register"}>
                      <MDBBreadcrumbItem>
                        <a
                          href="#"
                          style={{
                            fontSize: "18px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                          }}
                        >
                          Register
                        </a>
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
