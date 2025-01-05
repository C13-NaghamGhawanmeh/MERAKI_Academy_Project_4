import React, { useContext, useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBRipple } from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";
const App = () => {
  const { token, setToken } = useContext(UserContext);
  const [post, setpost] = useState("");
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
        setpost(res.data.post[0]);
        //   setPosts(res.data.posts);
        //   setUserId(res.data.userId);
        //   setuserName(res.data.userName)

        console.log("res.data.post", res.data.post[0]);
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
      <MDBCardBody>{post.title}</MDBCardBody>
      <div className="imgshow">

      {post.media?.map((p, index) => {
        return (
          <MDBRipple  rippleTag='a'  >
            <img src={p} className="img-fluid rounded" style={{width:"350px",height:"200px"}} alt="example" />
          </MDBRipple>
        );
      })}
                </div>

    </MDBCard>
  );
};
export default App;
