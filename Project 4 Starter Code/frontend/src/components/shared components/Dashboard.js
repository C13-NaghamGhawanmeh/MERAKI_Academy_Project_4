import axios from "axios";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../App";

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
              <div>{a.title}</div>
              <div>{a.description}fcg</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
