// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKWphqKE9wO-7-kvdEycGwkgl5sAtulHQ",
  authDomain: "period-tracker-8a18c.firebaseapp.com",
  projectId: "period-tracker-8a18c",
  storageBucket: "period-tracker-8a18c.appspot.com",
  messagingSenderId: "110199602849",
  appId: "1:110199602849:web:48547a5f8d2f3b821fbae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };