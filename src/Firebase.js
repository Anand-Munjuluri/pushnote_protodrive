// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDFPyjbpX_1USHqh_T5LPDEG615yURFlc0",
  authDomain: "alloc8now.firebaseapp.com",
  projectId: "alloc8now",
  storageBucket: "alloc8now.appspot.com",
  messagingSenderId: "957937715523",
  appId: "1:957937715523:web:a2fbf3a1fd19999a4387f6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)