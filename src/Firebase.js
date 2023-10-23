// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAIwWzyBmjXWZKo_0kVe4WzmdzL9UDS-_g",
  authDomain: "pushnote-9503e.firebaseapp.com",
  projectId: "pushnote-9503e",
  storageBucket: "pushnote-9503e.appspot.com",
  messagingSenderId: "580701245609",
  appId: "1:580701245609:web:e232eb356cce76ffc299b8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)