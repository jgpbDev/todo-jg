// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhJKuFORyf5MEgJzkvEU7C7hSG51VsPTc",
    authDomain: "todo-jg-f8f0e.firebaseapp.com",
    projectId: "todo-jg-f8f0e",
    storageBucket: "todo-jg-f8f0e.appspot.com",
    messagingSenderId: "934242120436",
    appId: "1:934242120436:web:618ec21308cc5395e5a4a1",
    measurementId: "G-S8KDTKH6JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

// export default db;
export {
    db,
    storage
}