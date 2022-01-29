import React, { useState } from 'react';
import "../styles/CreatePost.css"
import {addDoc, collection} from 'firebase/firestore'
import { db, auth } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    const postsCollectionRef = collection(db, "posts")
    let navigate = useNavigate()

    const createPost = async () => {
        await addDoc(postsCollectionRef, {title: title, postText: postText, author: {name: auth.currentUser.email, id: auth.currentUser.uid}})
        navigate("/")
    }

  return (
  <div className="CreatePost-page">
      <div className="CreatePost-container">
        <h1>Create A Post</h1>
        <div clasName="inputGp">
            <label> Title: </label>
            <input placeholder="Title..." onChange={(event) => {setTitle(event.target.value)}}/>
        </div>
        <div clasName="inputGp">
            <label> Post:</label>
            <textarea placeholder="Post..." onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
  </div>
  )}
