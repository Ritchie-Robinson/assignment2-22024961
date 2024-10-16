import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Authentication
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';  // Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDd4eAFvBEJcSMmIEqzubuE8JOHCUDFJVY",
  authDomain: "wad-83977.firebaseapp.com",
  projectId: "wad-83977",
  storageBucket: "wad-83977.appspot.com",
  messagingSenderId: "968978143068",
  appId: "1:968978143068:web:e1d85e13cee235e195d399",
  measurementId: "G-10G9414B2R"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebaseApp);  // authentication service
const db = getFirestore(firebaseApp);  // Firestore database

// Export firebase services 
export { auth, db, doc, getDoc, updateDoc };