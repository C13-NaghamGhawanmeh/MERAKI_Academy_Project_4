import React, { useState, useContext, useEffect, useRef } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import { UserContext } from "../../App";
import axios from "axios";

export default function App() {
  const {
    token,
    setToken,
    isClickedToAddPost,
    setIsClickedToAddPost,
    centredModal,
    setCentredModal,
    posts,
    setPosts,
  } = useContext(UserContext);
  
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dozr5pfwt",
        uploadPreset: "xyz123",
      },
      function (err, res) {
      try {
        if (res.info.url) {
          setMedia(res.info.url);
          console.log("success", res.info.url);
        }
       
      } catch (error) {
        console.log("failed",error);
    setMedia("https://res.cloudinary.com/dozr5pfwt/image/upload/v1736268395/x1xkmf2yqdkn8lfhzxa2.png");
        
      }
      }
    );
  }, []);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [IsCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const postInfo = { title, description, media };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  // const changeUrl = (e) => {
  //   setMedia(e.target.value);
  // };

  const addPost = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:5000/posts/createPost", postInfo, { headers })
      .then((res) => {
        // const post = posts.map((p, index) => {
        //   return p;
        // });
        // console.log("hhhhhhh",post);
        setMedia("")
        setPosts((prevPosts) => [...prevPosts, res.data.post]);
        setResponse(res.data.message);
        setIsCreated(true);
        setIsError(false);
        setCentredModal(!centredModal);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);

        setIsCreated(false);
        setIsError(true);
        setError(err.response.data.message);
      });
  };
  return (
    <>
      {isClickedToAddPost && (
        <MDBModal
          tabIndex="-1"
          open={centredModal}
          onClose={() => setCentredModal(false)}
        >
          <MDBModalDialog centered>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle
                  style={{
                    fontSize: "20px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  Add Post
                </MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => {
                    setCentredModal(!centredModal);
                  }}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="ModalInputs">
                <MDBInput
                  label="Title"
                  id="form1"
                  type="text"
                  onChange={changeTitle}
                />
                <MDBTextArea
                  label="Description"
                  id="textAreaExample"
                  rows="{4}"
                  onChange={changeDescription}
                />
                {/* <MDBInput
                  label="Images"
                  id="typeURL"
                  type="url"
                  onChange={changeUrl}
                /> */}
                <MDBBtn onClick={() => widgetRef.current.open()}>
                  Upload Image
                </MDBBtn>
              </MDBModalBody>
              {/* {IsCreated && (
                <>
                  <MDBProgress>
                    <MDBProgressBar
                      striped
                      animated
                      bgColor="warning"
                      width="100"
                      valuemin={0}
                      valuemax={100}
                    />
                  </MDBProgress>
                  <p
                    className="success2"
                    style={{
                      fontSize: "18px",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    {response}
                  </p>
                </>
              )}

              {isError && (
                <p
                  className="failed2"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  {error}
                </p>
              )} */}
              <MDBModalFooter>
                <MDBBtn
                  color="secondary"
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                  onClick={() => {
                    setCentredModal(!centredModal);
                  }}
                >
                  Close
                </MDBBtn>
                <MDBBtn
                  style={{
                    fontSize: "18px",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                  color="warning"
                  onClick={addPost}
                >
                  Add Post
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}
    </>
  );
}
