// To send a receive information on the user's ingredients list *** IN TESTING ***
import React from "react";
import { onSnapshot, updateDoc, arrayUnion, setDoc, doc, getDocs, getDoc, query, where, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../features/recipeSlice";

export default async function userQuery(operation, userEmail, ingredientsList) {
    // find document with corresponding user email
    const docRef = doc(db, "users", userEmail)
    var userArray = [];
    var ingrArray = [];

    // check if user already has account, if not, create document in "users", else append the ingredients list (no duplicates)
    if (operation === "UPDATE") {
        await setDoc(docRef, {
            email: userEmail,
            ingredients: arrayUnion(...ingredientsList)
        }, { merge: true });
    }

    // alternative: overwrite ingredients field with updated ingredients array altogether
    // this assumes that we have parsed through the local array, removed the ingredient, updated indexes, then pass this as parameter
    else if (operation === "OVERWRITE") {
        await updateDoc(docRef, {
            ingredients: ingredientsList
        })
    }

    // returns the user's ingredients list
    // var userArray = userQuery("GET", "sam@gmail.com", [])
    else if (operation === "GET") {
        console.log("GET");

        await getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                //console.log(docSnap.data().ingredients);
                userArray = docSnap.data().ingredients
                return userArray;
            } else {
                console.log("No such document!");
            }
        })
    }
    else if (operation === "COMPARE") {
        await getDoc(docRef).then(async docSnap => {

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                //console.log(docSnap.data().ingredients);
                userArray = docSnap.data().ingredients
                console.log(userArray);

                // we need to do query for each userArray element using getDocs, then store each query result to displa

                const recipesRef = collection(db, "recipes")
                const q = query(recipesRef, where('ingredients', 'array-contains-any', userArray))
                onSnapshot(q, (snapshot) => {
                    let temp = []
                    snapshot.docs.forEach((doc) => {
                        temp.push({ ...doc.data(), id: doc.id })
                    })

                    if (temp[0] != null) {
                        console.log(temp);
                    }
                    else {
                        console.log("Ingredients not found");
                    }
                    return temp;
                    //temp stores the filtered recipes so do what ever you need with temp
                })


            } else {
                console.log("Document not found!");
            }
        })
    }
    else {
        console.log("FIREBASE QUERY ERROR")
    }


}

