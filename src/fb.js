// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDec153E0djBQFq8bE3D9HeW4xcTXk5r7I",
    authDomain: "todo-jg-90ed0.firebaseapp.com",
    projectId: "todo-jg-90ed0",
    storageBucket: "todo-jg-90ed0.appspot.com",
    messagingSenderId: "537953346137",
    appId: "1:537953346137:web:d693e352476abf90048748"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;