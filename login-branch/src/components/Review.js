import React, {useEffect, useState} from 'react';
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore'
import {auth, db} from '../firebase/firebase'
import '../styles/Review.css'

function Review({isAuth}) {

    const [postLists, setPostList] = useState([])
    const postsCollectionRef = collection(db, "posts")

    useEffect(() => { //called when page is loaded
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };
        getPosts();

    });

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc)
    }

  return <div className="Review-page">
        {postLists.map((post) => {
            return <div className="Review-post"> 
                <div className="Review-postheader">
                    <div className="Review-title">
                        <h1 className="Review-header1">{post.title} </h1>
                    </div>
                    <div className="Review-delete">

                        {post.author.id == auth.currentUser.uid && (
                        <button 
                            onClick = {() => {
                                deletePost(post.id)
                            }}
                        >
                            &#128465;
                        </button>  
                        )}  
                     </div>
                        
                </div>
                <div className="Review-postTextContainer">
                    {post.postText}
                    <h3 className="Review-header3">@{post.author.name}</h3>
                </div>
             </div>
        })}
  </div>;
}

export default Review;
