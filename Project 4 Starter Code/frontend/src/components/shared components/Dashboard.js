import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import "../../../src/App.css";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBCard,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    token,
    posts,
    setPosts,
    setuserName,
    setUserId,
    setRole,
    searchTitle,
  } = useContext(UserContext);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
 
  const getAllPosts = () => {
    axios
      .get("http://localhost:5000/posts/getAllPosts", { headers })
      .then((res) => {
        console.log("nagham here", res);
        setUserId(res.data.userId);
        setPosts(res.data.posts);
        localStorage.setItem("userId", res.data.userId);
        setuserName(res.data.userName);
        setRole(res.data.role.role);
        localStorage.setItem("role", res.data.role.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPostsBySearch = () => {
    axios
      .post(
        "http://localhost:5000/posts/getPostsBySearch",
        { searchTitle: searchTitle },
        { headers }
      )
      .then((res) => {
        console.log("nagham here", res);
        setPosts(res.data.post);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    if (searchTitle) {
      getPostsBySearch();  
    } else {
      getAllPosts();  
    }
  }, [searchTitle]);  
  return (
    <>
    <div className=" DashPost ">
      {posts?.map((a, index) => {
        return (
          <div className="posts " key={index}>
            <div className="desc">
              <MDBCard className="HomeCards">
                <MDBRipple
                  rippleColor="light"
                  rippleTag="div"
                  className="bg-image hover-overlay"
                >
                  {a.media?.map((p, index) => {
                    if (p) {
                      return (
                        <MDBCardImage
                          src={p}
                          style={{ width: "400px", height: "250px" }}
                          fluid
                          alt="..."
                        />
                      );
                    } else {
                      return (
                        <MDBCardImage
                          src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1736337799/f5b7lm2jl07flfg4rzll.png"
                          style={{ width: "400px", height: "250px" }}
                          fluid
                          alt="..."
                        />
                      );
                    }
                  })}
                  <a>
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{a.title}</MDBCardTitle>
                  {/* <MDBCardText>{a.description}</MDBCardText> */}
                  <MDBBtn
                    id={a._id}
                    href="#"
                    color="warning"
                    onClick={(e) => {
                      navigate(`/PostDetails/${e.target.id}`);
                     
                    }}
                  >
                    More Details
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        );
      })}
    </div>
    <MDBFooter className='text-center text-white ' style={{ backgroundColor: 'white',    height: "85px" }}>
      <MDBContainer className='pt-4 cont'>
        <section className='mb-4 section1'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fab fa-facebook-f' size="2x" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-twitter'  size="2x" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-google'   size="2x"/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-instagram'  size="2x"/>
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' size="2x" />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github'  size="2x"/>
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3 footer' style={{ backgroundColor: "rgb(227 160 27 / 79%)" }}>
        <p style={{marginTop:"9px" ,fontSize:"18px"}}>© 2024 Copyright:Sakan.com</p>
          
      </div>
    </MDBFooter>
    
    </>
  );
};

export default Dashboard;
