// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries


import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXKC9MtWligZwc0rOBANyn8VxM9fqCvuk",
    authDomain: "joy-simple.firebaseapp.com",
    projectId: "joy-simple",
    storageBucket: "joy-simple.appspot.com",
    messagingSenderId: "552839776131",
    appId: "1:552839776131:web:eefa8e0dbd153cedb718b6",
    measurementId: "G-CBQH8CDF2X"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase;