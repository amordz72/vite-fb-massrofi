// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeo7vagP2pOAcFqm1UtHqRgtg0kyQWU-I",
  authDomain: "code-builder-528e4.firebaseapp.com",
  databaseURL: "https://code-builder-528e4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "code-builder-528e4",
  storageBucket: "code-builder-528e4.appspot.com",
  messagingSenderId: "1073753565201",
  appId: "1:1073753565201:web:5436ea47c5656d3847a9b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default app

