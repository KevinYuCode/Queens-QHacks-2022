import React, { useEffect, useState } from 'react';
import "../styles/CreatePost.css"
import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'

export default function CreatePost({isAuth}) {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate()

    const createPost = async () => {
        await addDoc(postsCollectionRef, {title: title, postText: postText, author: {name: auth.currentUser.email, id: auth.currentUser.uid}})
        navigate("/review")
    }

/*useEffect (() => {
    if (!isAuth) {
        navigate("/login")
    }
})*/

  return (
  <div className="CreatePost-page">
      <div className="CreatePost-container">
        <h1 className="CreatePost-header">Create A Post</h1>
        <div className="inputGp">
            <label className ="CreatePost-title"> Title: </label>
            <input  className="CreatePost-input" placeholder="Title..." onChange={(event) => {setTitle(event.target.value)}}/>
        </div>
        <div className="inputGp">
            <label className="CreatePost-post"> Post:</label>
            <textarea className="CreatePost-textarea" placeholder="Post..." onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button className="CreatePost-button" onClick={createPost}>Submit Post</button>
      </div>
  </div>
  )}
