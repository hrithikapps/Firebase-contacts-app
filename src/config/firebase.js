// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGPc9Kv1dKCUwmo-136IZkup4u4KQtj_c",
  authDomain: "vite-contacts-45348.firebaseapp.com",
  projectId: "vite-contacts-45348",
  storageBucket: "vite-contacts-45348.appspot.com",
  messagingSenderId: "180445899921",
  appId: "1:180445899921:web:30ae72d2aedbeff43de330",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
