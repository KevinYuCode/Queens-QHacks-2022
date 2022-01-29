import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//impot { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
        /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID*/
        apiKey: "AIzaSyBsEZEsDK9ksQGSw3zoO9-7xW3rbkQraWg",
        authDomain: "qhacks-2022-7d708.firebaseapp.com",
        projectId: "qhacks-2022-7d708",
        storageBucket: "qhacks-2022-7d708.appspot.com",
        messagingSenderId: "53936441897",
        appId: "1:53936441897:web:353b5d03086066f7096a38"
})

export const auth = firebaseConfig.auth()
export default firebaseConfig

export const db = getFirestore(firebaseConfig)
//export const provider = new GoogleAuthProvider