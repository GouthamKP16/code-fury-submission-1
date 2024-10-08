import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDc30zTc5ZuSNvLjOYvAorup420LTOd-s",
  authDomain: "hackthon-01-cd4ed.firebaseapp.com",
  projectId: "hackthon-01-cd4ed",
  storageBucket: "hackthon-01-cd4ed.appspot.com",
  messagingSenderId: "19462594562",
  appId: "1:19462594562:web:0430c95e7dc7b85a62871b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };