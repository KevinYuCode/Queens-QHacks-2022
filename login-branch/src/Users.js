import React , {useState, useEffect} from 'react';
import { db } from "./firebase/firebase"
import { collection, getDocs } from 'firebase/firestore'

function Users() {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users")

    useEffect(() => { //called when the page is rendered
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef) //returns documents
            console.log(data)
        };

        getUsers()
    }, [])

  return <div>
      
  </div>;
}

export default Users;
