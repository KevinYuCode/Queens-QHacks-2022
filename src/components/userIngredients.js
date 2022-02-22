// To send a receive information on the user's ingredients list *** IN TESTING ***
import React from "react";
import { collection, query, where, updateDoc, getDoc, getDocs, arrayUnion, addDoc, setDoc, doc, FieldValue, } from "firebase/firestore";
import { db } from "../firebase/firebase";

// check if user already has account, if not, create document in "users", else append the ingredients list (no duplicates)
function addIngredients(userEmail, ingredientsList) {

    setDoc(doc(db, "users", userEmail), {
        email: userEmail,
        ingredients: arrayUnion(...ingredientsList)
    }, { merge: true });
}

// doesn't work, not supported arrayRemove()?
// export default function removeIngredients(userEmail, ingredientRemove) {
//     const docRef = doc(db, "users", userEmail)
//     docRef.update({
//         ingredients: FieldValue.arrayRemove(ingredientRemove)
//     })
// }

// alternative: overwrite ingredients field with updated ingredients array altogether
// this assumes that we have parsed through the local array, removed the ingredient, updated indexes, then pass this as parameter
export default function updateArray(userEmail, newArray) {
    const docRef = doc(db, "users", userEmail)
    updateDoc(docRef, {
        ingredients: newArray
    })
}
