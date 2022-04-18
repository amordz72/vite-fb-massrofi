import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import app from "./index";

const auth = getAuth(app);

/*
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        console.log('Signed in ');
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message);

    });



signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sign-out successful. ');

}).catch((error) => {
    // An error happened.
    console.log(error);

});*/
export {
    auth, signInWithEmailAndPassword,
    signOut
}