// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2F67niN2XGuausGHeohjlU_Y3tUaaQH0",
    authDomain: "expen-e8cdc.firebaseapp.com",
    projectId: "expen-e8cdc",
    storageBucket: "expen-e8cdc.appspot.com",
    messagingSenderId: "660309344704",
    appId: "1:660309344704:web:a11ba03613bb5e0be2c825",
    measurementId: "G-ZCS3CNWFME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);