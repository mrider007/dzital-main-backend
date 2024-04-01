
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider , getAuth, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKWIIExMaVrxQ858PYKyLrj271uBSJy9c",
  authDomain: "dzital-38fcb.firebaseapp.com",
  databaseURL: "https://dzital-38fcb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dzital-38fcb",
  storageBucket: "dzital-38fcb.appspot.com",
  messagingSenderId: "1037771428251",
  appId: "1:1037771428251:web:8c6533617d284fb301113e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


export {auth , provider , facebookProvider};