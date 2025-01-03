// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe9ZvULBOj1iBp_4GD_hVAU5lMByZZpz4",
  authDomain: "ache-aqui-app.firebaseapp.com",
  projectId: "ache-aqui-app",
  storageBucket: "ache-aqui-app.firebasestorage.app",
  messagingSenderId: "555441686854",
  appId: "1:555441686854:web:d09968cec6ea96b5437d47",
  measurementId: "G-KQTJ0G5N7L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
const analytics = getAnalytics(app);