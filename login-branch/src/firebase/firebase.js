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
        apiKey: "AIzaSyB8wq6FFk8_FGbR4KNlwB3rFHYArMmTpmc",
        authDomain: "qhacks-2022.firebaseapp.com",
        projectId: "qhacks-2022",
        storageBucket:  "qhacks-2022.appspot.com",
        messagingSenderId: "525377169542",
        appId: "1:525377169542:web:f114c8d5a99f45804ec907"
})

export const auth = firebaseConfig.auth()
export default firebaseConfig

export const db = getFirestore(firebaseConfig)
//export const provider = new GoogleAuthProvider