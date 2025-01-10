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
    setsearchTitle,
  } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");

  const searchInfo = { searchTitle };
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

              {/*  */}
              {/* <div>title : {a.title}</div>
              <div>description : {a.description}</div>
              {a.media.map((p, index) => {
                return <img src={p} />;
              })} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
