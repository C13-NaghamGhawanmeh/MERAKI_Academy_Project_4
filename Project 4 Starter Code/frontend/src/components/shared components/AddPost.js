import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

const AddPost = () => {
  const { token, setToken } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [IsCreated, setIsCreated] = useState(false)
  const [isError, setIsError] = useState(false)
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const postInfo = { title, description ,media};

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const changeUrl = (e) => {
    setMedia(e.target.value);
  };
  const addPost = ()=>{
    setIsCreated(false)
    const headers = {
        Authorization: `Bearer ${token}`,
      };
    
    axios
    .post("http://localhost:5000/posts/createPost",postInfo , {headers})
    .then((res)=>{
        // const data = res
        setResponse(res.data.message)
        setIsCreated(true)
        setIsError(false)
        console.log(res);
        
    })
    .catch((err)=>{
        console.log(err);
        
    setIsCreated(false)
    setIsError(true)
    setError(err.response.data.message)

    })
  }
  return (
    <div className="Post">
      <input className="input3" placeholder="Title" onChange={changeTitle} />
      <textarea
        className="textarea1"
        placeholder="Description"
        onChange={changeDescription}
      ></textarea>
      <input
        className="input3"
        placeholder="URL images/video"
        onChange={changeUrl}
      />
      <button className="Btn3" onClick={addPost}>Add Post</button>
        {IsCreated&&<p className="success2">{response}</p>}
        {isError&&<p className="failed2">{error}</p>}
    </div>
  );
};

export default AddPost;
