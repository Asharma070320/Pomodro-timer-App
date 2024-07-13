// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiK4F0s8tb5tF5Ge_pPpI76XBk65-tZt0",
  authDomain: "promodor-project-e4b08.firebaseapp.com",
  projectId: "promodor-project-e4b08",
  storageBucket: "promodor-project-e4b08.appspot.com",
  messagingSenderId: "710450302391",
  appId: "1:710450302391:web:a3985b1fa989b378d2ec32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export {auth}