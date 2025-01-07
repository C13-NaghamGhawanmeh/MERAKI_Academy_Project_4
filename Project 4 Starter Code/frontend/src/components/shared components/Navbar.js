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
          {token && (
            <MDBInputGroup tag="form" className="d-flex w-auto mb-3 Search">
              <input
                className="form-control Input"
                placeholder="Search"
                aria-label="Search"
                type="Search"
              />
              <MDBBtn outline color="warning">
                Search
              </MDBBtn>
            </MDBInputGroup>
          )}
          <div>
            {token ? (
              <div>
                <nav aria-label="breadcrumb">
                  <MDBBreadcrumb className="BreadcrumbItem">
                    <MDBBreadcrumbItem>
                      <Link to={"/Dashboard"}>
                        <a
                          href="#"
                          style={{
                            fontSize: "22px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                          }}
                        >
                          Home
                        </a>
                      </Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>
                      <a
                        href="#"
                        onClick={() => {
                          setCentredModal(!centredModal);
                          setisClickedToAddPost(true);
                        }}
                        style={{
                          fontSize: "22px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                        }}
                      >
                        Add Post
                      </a>
                    </MDBBreadcrumbItem>
                    {isClickedToAddPost && <AddPost />}
                    {/* </Link> */}

                    <MDBBreadcrumbItem>
                        <MDBDropdown>
                          <MDBDropdownToggle
                            tag="a"
                            className="nav-link"
                            role="button"
                            style={{
                              marginRight: "15px",
                            }}
                          >
                            <MDBIcon far size='1x' icon="user-circle" />
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
                            fontSize: "22px",
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
                            fontSize: "22px",
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
