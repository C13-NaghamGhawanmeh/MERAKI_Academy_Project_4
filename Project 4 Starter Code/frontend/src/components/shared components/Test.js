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
  const { token, setToken, userId, setUserId } = useContext(UserContext);
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

        {userId === post.author && (
          <>
            <MDBBtn outline className="mx-2" color="danger">
              Delete
            </MDBBtn>
          </>
        )}
        <MDBListGroupItem>Dapibus ac facilisis in</MDBListGroupItem>
        <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
      </MDBListGroup>

      {/* <p>{post.description}</p> */}
    </MDBCard>
  );
};
export default App;
