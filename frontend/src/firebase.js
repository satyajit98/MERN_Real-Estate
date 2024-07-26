// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7752b.firebaseapp.com",
  projectId: "mern-estate-7752b",
  storageBucket: "mern-estate-7752b.appspot.com",
  messagingSenderId: "483460471728",
  appId: "1:483460471728:web:e568e17cfefcf2d3ebd475",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
