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
  MDBNavbarLink,
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
    searchTitle,
    setsearchTitle,
  } = useContext(UserContext);
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
            <MDBInputGroup className="d-flex w-auto mb-3 Search">
              <input
                className="form-control Input"
                placeholder="Search"
                aria-label="Search"
                // type="Search"
                onChange={(e) => {
                  setsearchTitle(e.target.value);
                  // localStorage.setItem("searchTitle",e.target.value)
                  console.log(e.target.value);
                }}
              />
              <MDBBtn outline color="warning">
                Search
              </MDBBtn>
            </MDBInputGroup>
          )}
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns:"1fr1fr",
              width:"18%"
              // justifyContent: "space-between",
            }}
          >
            {token ? (
              <div  >
                <nav aria-label="breadcrumb" style={{
                display: "flex",
                // flexDirection:"row"
                // width:"40%"
                justifyContent: "space-between",
              }}>
                  <MDBNavbarLink
                    href="/Dashboard"
                    style={{
                      fontSize: "22px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    Home
                  </MDBNavbarLink>

                  <MDBNavbarLink
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
                  </MDBNavbarLink>

                  {isClickedToAddPost && <AddPost />}

                  <MDBDropdown>
                    <MDBDropdownToggle
                      tag="a"
                      className="nav-link"
                      role="button"
                      style={{
                        marginRight: "15px",
                      }}
                    >
                      <MDBIcon far size="2x" icon="user-circle" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        link
                        style={{
                          fontSize: "18px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          color:"black"

                        }}
                      >
                        Account
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                              
                        <Link style={{color:"black",fontSize:"18px"}}  to={"/Favorites"}>Saves</Link>
                      </MDBDropdownItem>
                      <MDBDropdownItem link>
                        <Link to={"/Logout"}>
                          <a
                            href="#"
                            style={{
                              fontSize: "18px",
                              fontFamily: "Arial, Helvetica, sans-serif",
                              fontWeight: "bold",
                              color:"black"
                            }}
                          >
                            Logout ({userName})
                          </a>
                        </Link>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </nav>
              </div>
            ) : (
              <div>
                <nav aria-label="breadcrumb">
                  <MDBBreadcrumb className="BreadcrumbItem">
                    <Link to={"/"}>
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
