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
  const [comment, setcomment] = useState("");

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
        //   setUserId(res.data.userId);
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addComment = (id) => {
    setIsCommented(true);

    axios
      .post(`http://localhost:5000/posts/${id}/comments/`, commentInfo, {
        headers,
      })
      .then((res) => {
        setIsCommented(false);
        const post = post.map((p, index) => {
          return p;
        });
        setPosts(post);
        // getAllPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPostById();
  }, []);
  return (
    <>
      <MDBCard className="TextCard">
        <MDBCardBody className="CardBody">
          <h2
            className="text-black font"
            
          >
            {post.title}
          </h2>
          <p>{post.description}</p>

          <MDBRow className="photo">
            <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
              <div className="bg-image hover-overlay ripple shadow-1-strong rounded">
                <img
                  src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1736174224/slwvy8jltdxmyo98ld7s.jpg"
                  className="w-100"
                />
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
          </MDBRow>

          <MDBModal open={modal1} setShow={setModal1}>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalBody>
                  <div className="ratio ratio-16x9">
                    <img className="lg-image"
                      src="https://res.cloudinary.com/dozr5pfwt/image/upload/v1736174224/slwvy8jltdxmyo98ld7s.jpg"
                      title="YouTube video"
                      allowFullScreen
                      style={{ width: "470px", height: "270px"}}
                    ></img>
                  </div>
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn onClick={() => setModal1(!modal1)} color="secondary">
                    Close
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};
export default App;
