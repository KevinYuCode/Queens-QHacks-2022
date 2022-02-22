// To send a receive information on the user's ingredients list
import React from "react";
import { collection, query, where, updateDoc, getDoc, getDocs, arrayUnion, addDoc, setDoc, doc, FieldValue } from "firebase/firestore";
import { db } from "../firebase/firebase";

// check if user already has account, if not, create document in "users", else append the ingredients list
function addIngredients(userEmail, ingredientsList) {

    setDoc(doc(db, "users", userEmail), {
        email: userEmail,
        ingredients: arrayUnion(...ingredientsList)
    }, { merge: true });
}

// doesn't work
export default function removeIngredients(userEmail, ingredientRemove) {
    const docRef = doc(db, "users", userEmail)
    docRef.update({
        ingredients: FieldValue.arrayRemove(ingredientRemove)
    })
}

