import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2lkuTgF6ZdQ-_planp5YWbWBc7PEK2lo",
  authDomain: "blogging-939a8.firebaseapp.com",
  projectId: "blogging-939a8",
  storageBucket: "blogging-939a8.appspot.com",
  messagingSenderId: "602846455883",
  appId: "1:602846455883:web:f47f8f35fa324d273ec5ce"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();