import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import "../../../src/App.css"
const Dashboard = () => {
  const { token, setToken, posts, setPosts } = useContext(UserContext);

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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
