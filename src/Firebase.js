// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCHBKj2e1q-FXj7U0XAYEkVh-QGx5zoTZM",
  authDomain: "pushnotes-36166.firebaseapp.com",
  projectId: "pushnotes-36166",
  storageBucket: "pushnotes-36166.appspot.com",
  messagingSenderId: "960376369712",
  appId: "1:960376369712:web:a5f85daa862d6480f8b3f5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)