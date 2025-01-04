import React, { useState, useContext } from "react";
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
  const { token, setToken } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [IsCreated, setIsCreated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const postInfo = { title, description, media };
  const { centredModal, setCentredModal } = useContext(UserContext);
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changeUrl = (e) => {
    setMedia(e.target.value);
  };
  //   const [centredModal, setCentredModal] = useState(false);

  //   const toggleOpen = () => setCentredModal(!centredModal);
  const addPost = () => {
    setIsCreated(false);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post("http://localhost:5000/posts/createPost", postInfo, { headers })
      .then((res) => {
        // const data = res
        setResponse(res.data.message);
        setIsCreated(true);
        setIsError(false);
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
      {/* <MDBBtn onClick={toggleOpen}>Vertically centered modal</MDBBtn> */}

      <MDBModal
        tabIndex="-1"
        open={centredModal}
        onClose={() => setCentredModal(false)}
      >
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Post</MDBModalTitle>
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
              <MDBInput
                label="Images"
                id="typeURL"
                type="url"
                onChange={changeUrl}
              />
            </MDBModalBody>
            <MDBProgress>
              <MDBProgressBar
               striped animated
                bgColor="warning"
                width="25"
                valuemin={0}
                valuemax={100}
              />
            </MDBProgress>
            {IsCreated && <p className="success2">{response}</p>}
            {isError && <p className="failed2">{error}</p>}
            <MDBModalFooter>
              <MDBBtn
                color="secondary"
                onClick={() => {
                  setCentredModal(!centredModal);
                }}
              >
                Close
              </MDBBtn>
              <MDBBtn color="warning" onClick={addPost}>
                Add Post
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
