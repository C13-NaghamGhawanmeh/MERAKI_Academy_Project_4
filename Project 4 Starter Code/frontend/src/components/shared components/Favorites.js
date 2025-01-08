import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../../App";
import { MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const Favorites = () => {
  const { token, userId } = useContext(UserContext);
  const [favoritePosts, setFavoritePosts] = useState([]);
  const [isClickedToRemove, setIsClickedToRemove] = useState(true);
  const [target, setTarget] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllFavorites = () => {
    axios
      .get("http://localhost:5000/posts/getAllFavorites", { headers })
      .then((res) => {
        console.log(res.data.favorites);
        const data = res.data.favorites;
        setFavoritePosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFavoriteItem = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}/deleteFavoriteItem`, {
        headers,
      })
      .then((res) => {
        console.log(res);
        const favPosts = favoritePosts.filter((p) => {
          return p.favoriteItem._id !== id;
        });
        console.log(favPosts);
        console.log("tttttt");

        setFavoritePosts(favPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllFavorites();
  }, []);

  return (
    <>
      {favoritePosts?.map((p, index) => {
        return (
          <MDBCard className="TextCard">
            <MDBCardBody className="CardBody">
              <div>
                <div>
                  <div>
                    <div>
                      <h1>{p.favoriteItem.title}</h1>
                      <MDBBtn
                        className="save"
                        id={p.favoriteItem._id}
                        color="warning"
                        onClick={(e) => {
                            deleteFavoriteItem(e.target.id);

                        //   if (e.target.innerText === "UNSAVE") {
                        //     if (p.favoriteItem._id === e.target.id) {
                        //       deleteFavoriteItem(e.target.id);
                        //   setIsClickedToRemove(!isClickedToRemove);
                        //     }
                        //   } else {
                        //   setIsClickedToRemove(!isClickedToRemove);
                        //   }
                          console.log(e.target.innerText);
                        }}
                      >
                        Unsave
                      </MDBBtn>
                    </div>
                  </div>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        );
      })}
      {/* <div>{favoritePosts[0].favoriteItem.title}</div> */}
    </>
  );
};

export default Favorites;
