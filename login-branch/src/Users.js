import React , {useState, useEffect} from 'react';
import { db } from "../../src/firebase/firebase"
import { collection, getDocs, addDoc } from 'firebase/firestore'

function Users() {
    const[newName, setNewName] = useState("")
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users")

    const createUser = async () => {
        await addDoc(usersCollectionRef, {name: newName})
    }

    useEffect(() => { //called when the page is rendered
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef) //returns documents
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };

        getUsers()
    }, [])

  return <div className="Users">
      <input 
      placeholder="Name..." 
      onChange={(event) => {
          setNewName(event.target.value)
          }}
    />
      <button onClick={createUser}>
          Create User
      </button>
      {users.map((user) => {
          return <div> 
              {" "}
              <h1>Name: {user.name}</h1>
          </div>
          })}
  </div>;
}

export default Users;
