// To send a receive information on the user's ingredients list *** IN TESTING ***
import React from "react";
import { updateDoc, arrayUnion, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function userQuery(operation, userEmail, ingredientsList) {
    // find document with corresponding user email
    const docRef = doc(db, "users", userEmail)

    // check if user already has account, if not, create document in "users", else append the ingredients list (no duplicates)
    if (operation === "UPDATE") {
        setDoc(docRef, {
            email: userEmail,
            ingredients: arrayUnion(...ingredientsList)
        }, { merge: true });
    }

    // alternative: overwrite ingredients field with updated ingredients array altogether
    // this assumes that we have parsed through the local array, removed the ingredient, updated indexes, then pass this as parameter
    else if (operation === "OVERWRITE") {
        updateDoc(docRef, {
            ingredients: ingredientsList
        })
    }
    else {
        console.log("FIREBASE QUERY ERROR")
    }
}

// -----------------------------

// doesn't work, not supported arrayRemove()?
// export default function removeIngredients(userEmail, ingredientRemove) {
//     const docRef = doc(db, "users", userEmail)
//     docRef.update({
//         ingredients: FieldValue.arrayRemove(ingredientRemove)
//     })
// }
