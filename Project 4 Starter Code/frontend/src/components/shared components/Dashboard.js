import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import "../../../src/App.css";
const Dashboard = () => {
  const { token, setToken, posts, setPosts } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("")
  const [isClickedToUpdate, setIsClickedToUpdate] = useState(false);
  const postInfo = { title, description ,media };
  const getAllPosts = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get("http://localhost:5000/posts/getAllPosts", { headers })
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
        console.log("res.data.posts", res.data.posts);
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
        getAllPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div>
      {posts?.map((a, index) => {
        return (
          <div className="posts" key={index}>
            <div className="desc">
              <div>title : {a.title}</div>
              <div>description : {a.description}</div>
              {a.media.map((p, index) => {
                return <img src={p} />;
              })}
              <button
                id={a._id}
                className="Btn4"
                onClick={(e) => {
                  deletePostById(e.target.id);
                }}
              >
                delete
              </button>
              {isClickedToUpdate || (
                <button
                  id={a._id}
                  className="Btn5"
                  onClick={(e) => {
                    <input>here</input>;
                    setIsClickedToUpdate(true);
                  }}
                >
                  update
                </button>
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
                  <input placeholder="media" onChange={(e) => {
                      setMedia(e.target.value);
                    }}/>

                  <button
                    id={a._id}
                    onClick={(e) => {
                      updatePostById(e.target.id);
                    setIsClickedToUpdate(false);

                    }}
                  >
                    click
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
