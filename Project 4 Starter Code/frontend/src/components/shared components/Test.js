import React, { useContext, useEffect } from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../App';
const App=()=>{
      const { token, setToken} = useContext(UserContext);
    
    const {id} = useParams()
    console.log("kkkkkkkk",id);
    const headers = {
        Authorization: `Bearer ${token}`,
      };
const getPostById = ()=>{
    axios
    .get(`http://localhost:5000/posts/getPostById/${id}`, { headers })
    .then((res) => {
      console.log("hello here",res);
    //   setPosts(res.data.posts);
    //   setUserId(res.data.userId);
    //   setuserName(res.data.userName)

      console.log("res.data.post", res.data.post);
    })
    .catch((err) => {
      console.log(err);
    });
}
 useEffect(() => {
    getPostById();
  }, []);
  return (
    <MDBCard className='TextCard'>
      <MDBCardBody>This is title</MDBCardBody>
      <img
      src='https://mdbootstrap.com/img/new/standard/city/041.webp'
      className='img-thumbnail'
      alt='...'
    />
    </MDBCard>
  );
}
export default App