import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import "../styles/Review.css";
import Nav from "../views/Nav";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Review({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const [reRender, setRerender] = useState(0);
  const navigate = useNavigate();

  const deletePost = async (id) => {
    console.log(id);
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef)
      .then(() => {
        console.log("post Successfully deleted");
      })
      .catch((e) => {
        console.log(e);
      });
    getPosts();
  };

  const getPosts = async () => {
    const collectionQuery = query(postsCollectionRef);
    const querySnapshot = await getDocs(collectionQuery);

    const tempData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      tempData.push(data);
    });
    setPostList(tempData);
  };

  //Directs you to page to create a new post
  const navPost = async () => {
    navigate("/createpost");
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div className="Review-nav">
        <Nav />
        <div className="Review-page">
          {postLists.map((post) => {
            return (
              <div className="Review-post">
                <div className="Review-postheader">
                  <div className="Review-title">
                    <h1 className="Review-header1">{post.title} </h1>
                    <h3 className="Review-header3">By: {post.author.name}</h3>
                  </div>
                  <div className="Review-delete">
                    {post.author.id == auth.currentUser.uid && (
                      <button
                        onClick={() => {
                          deletePost(post.id);
                          setRerender(reRender + 1);
                        }}
                        className="Review-button"
                      >
                        <FaTrashAlt />
                      </button>
                    )}
                  </div>
                </div>
                <div className="Review-postTextContainer">{post.postText}</div>
              </div>
            );
          })}
        </div>
        <button className="Review-createpost" onClick={navPost}>
          Post Review
        </button>
      </div>
    </>
  );
}

export default Review;
