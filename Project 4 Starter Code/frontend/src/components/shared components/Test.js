import React, { useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalDialog,
  MDBModalContent,
  MDBInputGroup,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
const App = () => {
  const [modal1, setModal1] = useState(false);

  const {
    token,
    setToken,
    userId,
    setUserId,
    isClickedToUpdate,
    setIsClickedToUpdate,
    posts,
    setPosts,
  } = useContext(UserContext);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [comment, setComment] = useState("");

  const [isCommented, setIsCommented] = useState(false);
  const postInfo = { title, description, media };
  const commentInfo = { comment };
  const { id } = useParams();
  console.log("kkkkkkkk", id);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getPostById = () => {
    axios
      .get(`http://localhost:5000/posts/getPostById/${id}`, { headers })
      .then((res) => {
        console.log("hello here", res);
        setPost(res.data.post[0]);
        //   setPosts(res.data.posts);
        // setUserId(res.data.userId);
        //   setuserName(res.data.userName)

        console.log("res.data.post", res.data.post[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePostById = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}/delete`)
      .then((res) => {
        const post = posts.filter((post, index) => {
          return post._id !== id;
        });
        setPosts(post);
        console.log(posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updatePostById = (id) => {
    axios
      .put(`http://localhost:5000/posts/${id}/update`, postInfo)
      .then((res) => {
        const post = posts.map((p, index) => {
          return p;
        });
        setPosts(post);
        getPostById();
        // getAllPosts();
        // console.log(post);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addComment = (id) => {
    // setIsCommented(true);

    axios
      .post(`http://localhost:5000/posts/${id}/comments/`, commentInfo, {
        headers,
      })
      .then((res) => {
        // setIsCommented(false);
        const comment = post.comments.map((p, index) => {
          return p;
        });
        setComment(comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPostById();
  }, [comment]);
  return (
    <>
      <MDBCard className="TextCard">
        <MDBCardBody className="CardBody">
          <div>
            <div className="head">
              <div className="titleDesc">
                <h2 className="text-black font">{post.title}</h2>
                <p>{post.description}</p>
              </div>
              {userId === post.author && (
                <>
                  {" "}
                  <MDBDropdown className="Drop">
                    <MDBDropdownToggle color="warning">
                      Edit Post
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link color="warning">
                        Update
                      </MDBDropdownItem>
                      <MDBDropdownItem link>Delete</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </>
              )}
            </div>

            {post.media?.map((p, index) => {
              return (
                <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
                  <div className="bg-image hover-overlay ripple shadow-1-strong rounded ">
                    <img src={p} className="w-100" />

                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => setModal1(!modal1)}
                    >
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                      ></div>
                    </a>
                  </div>
                </MDBCol>
              );
            })}
            {post.comments?.map((c, index) => {
              return (
                <MDBCard
                  style={{ marginTop: "15px", width: "700px", height: "40px" }}
                >
                  <p style={{ alignSelf: "flex-start", padding: "10px" }}>
                    {c.comment}
                  </p>
                </MDBCard>
              );
            })}

            <MDBInputGroup
              className="mb-3"
              style={{ width: "600px", marginTop: "40px" }}
            >
              <input
                className="form-control"
                placeholder="Comment as username"
                type="text"
                onChange={(e)=>{
                  setComment(e.target.value)
                }}
              />
              <MDBBtn
                outline
                color="warning"
                id={post._id}
                onClick={(e) => {
                  addComment(e.target.id);
                }}
              >
                Comment
              </MDBBtn>
            </MDBInputGroup>
            {/*  */}

            <MDBModal open={modal1} setShow={setModal1}>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalBody>
                    <div
                      className="ratio ratio-16x9"
                      style={{ width: "1000px", height: "350px" }}
                    >
                      <img
                        className="lg-image"
                        src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1736174224/slwvy8jltdxmyo98ld7s.jpg"
                        title="YouTube video"
                        allowFullScreen
                        style={{ width: "470px", height: "350px" }}
                      ></img>
                    </div>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn
                      onClick={() => setModal1(!modal1)}
                      color="secondary"
                    >
                      Close
                    </MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>
            {/*  */}
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};
export default App;
