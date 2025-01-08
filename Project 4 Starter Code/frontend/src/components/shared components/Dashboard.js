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
  MDBCardText,
} from "mdb-react-ui-kit";
const Dashboard = () => {
  const navigate = useNavigate();

  const {
    token,
    setToken,
    posts,
    setPosts,
    userName,
    setuserName,
    userId,
    setUserId,
  } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [comment, setcomment] = useState("");

  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const [isCommented, setIsCommented] = useState(false);

  const postInfo = { title, description, media };
  const commentInfo = { comment };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllPosts = () => {
    axios
      .get("http://localhost:5000/posts/getAllPosts", { headers })
      .then((res) => {
        console.log("nagham here",res);
        setPosts(res.data.posts);
        setUserId(res.data.userId);
        localStorage.setItem("userId", res.data.userId);
        setuserName(res.data.userName);

        // console.log("res.data.posts", res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const deletePostById = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/posts/${id}/delete`)
  //     .then((res) => {
  //       const post = posts.filter((post, index) => {
  //         return post._id !== id;
  //       });
  //       setPosts(post);
  //       console.log(posts);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const updatePostById = (id) => {
  //   axios
  //     .put(`http://localhost:5000/posts/${id}/update`, postInfo)
  //     .then((res) => {
  //       const post = posts.map((p, index) => {
  //         return p;
  //       });
  //       setPosts(post);
  //       getAllPosts();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const addComment = (id) => {
  //   setIsCommented(true);

  //   axios
  //     .post(`http://localhost:5000/posts/${id}/comments/`, commentInfo, {
  //       headers,
  //     })
  //     .then((res) => {
  //       setIsCommented(false);
  //       getAllPosts();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className=" DashPost ">
      {posts?.map((a, index) => {
        return (
          <div className="posts " key={index}>
            <div className="desc" >
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
                          src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1736268395/x1xkmf2yqdkn8lfhzxa2.png"
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
                      navigate(`/Test/${e.target.id}`);
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
