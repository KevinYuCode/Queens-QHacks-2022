import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBsEZEsDK9ksQGSw3zoO9-7xW3rbkQraWg",
  authDomain: "qhacks-2022-7d708.firebaseapp.com",
  projectId: "qhacks-2022-7d708",
  storageBucket: "qhacks-2022-7d708.appspot.com",
  messagingSenderId: "53936441897",
  appId: "1:53936441897:web:353b5d03086066f7096a38",
});

export const auth = firebaseConfig.auth();
export default firebaseConfig;

//Initialize Services
export const db = getFirestore(firebaseConfig);

//Collection Ref
//Get collection data
