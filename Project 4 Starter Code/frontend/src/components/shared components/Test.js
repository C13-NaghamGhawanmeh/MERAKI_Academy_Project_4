import React from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
const App=()=>{
    const {a} = useParams()
    console.log("kkkkkkkk",a);
    
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