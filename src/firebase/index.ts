// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMWnMUxwERltoyIipBiffguQqkCOiHtl0",
  authDomain: "petshop-3871e.firebaseapp.com",
  projectId: "petshop-3871e",
  storageBucket: "petshop-3871e.appspot.com",
  messagingSenderId: "701092389886",
  appId: "1:701092389886:web:888346904c0b399a7216af",
  measurementId: "G-8NGF95RR5C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
