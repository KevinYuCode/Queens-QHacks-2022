// To send a receive information on the user's ingredients list *** IN TESTING ***
import React from "react";
import { updateDoc, arrayUnion, setDoc, doc, getDoc, } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default async function userQuery(operation, userEmail, ingredientsList) {
    // find document with corresponding user email
    const docRef = doc(db, "users", userEmail)
    var userArray = [];

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

        // if empty, change to non-empty for valid query call
        // if (ingredientsList.length === 0) {
        //     ingredientsList = ["DEFAULT"]
        // }

        await updateDoc(docRef, {
            ingredients: ingredientsList
        })
    }

    // returns the user's ingredients list
    else if (operation === "GET") {
        // console.log("GET");

        await getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                //console.log(docSnap.data().ingredients);
                userArray = docSnap.data().ingredients
                console.log(userArray);
                return userArray;
            } else {
                console.log("No such document!");
            }
        })
    }
    else {
        console.log("FIREBASE QUERY ERROR")
    }


}

