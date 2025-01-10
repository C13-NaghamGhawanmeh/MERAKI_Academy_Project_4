import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInputGroup,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBIcon,
} from "mdb-react-ui-kit";

const Favorites = () => {
  const { token ,userId,role} = useContext(UserContext);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [comment, setComment] = useState("");
  const [modal3, setModal3] = useState(false);
  const commentInfo = { comment };

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllFavorites = () => {
    axios
      .get("http://localhost:5000/posts/getAllFavorites", { headers })
      .then((res) => {
        console.log(res.data.favorites);
        const data = res.data.favorites;
        setFavoritePosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFavoriteItem = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}/deleteFavoriteItem`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        const favPosts = favoritePosts.filter((p) => {
          return p.favoriteItem._id !== id;
        });
        console.log(favPosts);
        console.log("tttttt");

        setFavoritePosts(favPosts);
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
        // const newComment = res.data.comment;
        // setFavoritePosts((prevPosts) =>
        //   prevPosts.map((post) => {
        //     if (post.favoriteItem._id === id) {
        //       return {
        //         ...post,
        //         favoriteItem: {
        //           ...post.favoriteItem,
        //           comments: [...post.favoriteItem.comments, newComment],
        //         },
        //       };
        //     }
        //     return post;
        //   })
        // );
        getAllFavorites()
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const deleteCommentById = (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:5000/posts/${id}/comments/delete`, { headers })
      .then((res) => {
        // const updatedPosts = favoritePosts.map((post) => {
        //   if (post._id === id) {
        //     // تحديث الكومنتات داخل البوست المحدد
        //     return {
        //       ...post,
        //       comments: post.comments.filter((c) => c._id !== id),
        //     };
        //   }
        //   return post; // باقي البوستات تظل كما هي
        // });
  
        // setFavoritePosts(updatedPosts);

        const updatedPosts = favoritePosts.map((post) => {
          return {
            ...post,
            favoriteItem: {
              ...post.favoriteItem,
              comments: post.favoriteItem.comments.filter((c) => c._id !== id),
            },
          };
        });
  
        setFavoritePosts(updatedPosts); // تحديث الحالة
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      {favoritePosts?.map((p, index) => {
        return (
          <MDBCard className="TextCard">
            <MDBCardBody className="CardBody">
              <div>
                <div className="head">
                  <div className="titleDesc">
                    <div className="firstLine">
                      <h1 className="text-black font">
                        {p.favoriteItem.author.userName}
                      </h1>
                      <MDBBtn
                        className="save"
                        id={p.favoriteItem._id}
                        color="warning"
                        onClick={(e) => {
                          deleteFavoriteItem(e.target.id);
                          console.log(e.target.innerText);
                        }}
                      >
                        Unsave
                      </MDBBtn>
                    </div>
                    <h2 className="text-black font">{p.favoriteItem.title}</h2>
                    <p
                      className="text-break"
                      style={{ width: "900px", textAlign: "start" }}
                    >
                      {p.favoriteItem.description}
                    </p>
                  </div>
                </div>
                {p.favoriteItem.media?.map((m, index) => {
                  return (
                    <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
                      <div className="bg-image hover-overlay ripple shadow-1-strong rounded ">
                        <img
                          src={m}
                          className="w-100"
                          style={{ height: "400px" }}
                        />

                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => setModal3(!modal3)}
                        >
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </div>
                    </MDBCol>
                  );
                })}

                {p.favoriteItem.comments?.map((c, index) => {
                  return (
                    <MDBCard
                      style={{
                        marginTop: "15px",
                        width: "700px",
                        height: "max-content",
                      }}
                    >
                      <p
                        className="text-break"
                        style={{ alignSelf: "flex-start", padding: "10px" }}
                      >
                        {c.commenter?.userName}: {c.comment}
                      </p>
                      {(userId === c.commenter._id || role === "Admin") && (
                        <MDBBtn
                          floating
                          tag="a"
                          color="danger"
                          style={{ margin: "10px" }}
                        >
                          <MDBIcon
                            id={c._id}
                            fas
                            icon="times"
                            onClick={(e) => {
                              console.log("test");
                              console.log(e.target.id);

                              deleteCommentById(e.target.id);
                            }}
                          />
                        </MDBBtn>
                      )}
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
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <MDBBtn
                    outline
                    color="warning"
                    id={p.favoriteItem._id}
                    onClick={(e) => {
                      addComment(e.target.id);
                    }}
                  >
                    Comment
                  </MDBBtn>
                </MDBInputGroup>
                <MDBModal open={modal3} setShow={setModal3}>
                  <MDBModalDialog>
                    <MDBModalContent>
                      <MDBModalBody>
                        <div
                          className="ratio ratio-16x9"
                          style={{ width: "1000px", height: "350px" }}
                        >
                          <img
                            className="lg-image"
                            src={p.favoriteItem.media}
                            allowFullScreen
                            style={{ width: "470px", height: "350px" }}
                          ></img>
                        </div>
                      </MDBModalBody>
                      <MDBModalFooter>
                        <MDBBtn
                          onClick={() => setModal3(!modal3)}
                          color="secondary"
                        >
                          Close
                        </MDBBtn>
                      </MDBModalFooter>
                    </MDBModalContent>
                  </MDBModalDialog>
                </MDBModal>
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      })}
      {/* <div>{favoritePosts[0].favoriteItem.title}</div> */}
    </>
  );
};

export default Favorites;
