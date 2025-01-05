import React, { useContext, useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
const App = () => {
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
        const post = post.map((p,index)=>{
            return p
        })
        setPosts(post)
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
    <MDBCard className="TextCard">
      <MDBCardBody>
        <h2 className="text-muted">{post.title}</h2>
        <p>{post.description}</p>
      </MDBCardBody>
      <div className="imgshow">
        {post.media?.map((p, index) => {
          return (
            <MDBRipple rippleTag="a">
              <img
                src={p}
                className="img-fluid rounded"
                style={{
                  width: "350px",
                  height: "200px",
                  border: "3px solid lightGrey",
                }}
                alt="example"
              />
            </MDBRipple>
          );
        })}
      </div>
      <MDBListGroup flush style={{ marginTop: "20px" }}>
        {post.comments?.map((c, index) => {
          return <MDBListGroupItem>{c.comment}</MDBListGroupItem>;
        })}

        
      </MDBListGroup>
      {userId === post.author && (
          <>
            <MDBBtn outline className="mx-2" color="danger">
              Delete
            </MDBBtn>
            {isClickedToUpdate || (
              <MDBBtn
                outline
                className="mx-2"
                color="danger"
                id={post._id}
                onClick={(e) => {
                  <input>here</input>;
                  setIsClickedToUpdate(true);
                }}
              >
                Update
              </MDBBtn>
            )}
            {isClickedToUpdate && (
              <>
                <input
                  placeholder="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <textarea
                  placeholder="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <input
                  placeholder="media"
                  onChange={(e) => {
                    setMedia(e.target.value);
                  }}
                />

                <button
                  id={post._id}
                  onClick={(e) => {
                    updatePostById(e.target.id);
                    setIsClickedToUpdate(false);
                  }}
                >
                  click
                </button>
              </>
            )}
          </>
        )}
        <input
          placeholder="Comment"
          onChange={(e) => {
            setcomment(e.target.value);
          }}
        />
        <button
          id={post._id}
          onClick={(e) => {
            addComment(e.target.id);
            setIsCommented(true);
          }}
        >
          add Comment
        </button>
      {/* <p>{post.description}</p> */}
    </MDBCard>
  );
};
export default App;
