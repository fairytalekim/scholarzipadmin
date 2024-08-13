import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "scholar-zip.firebaseapp.com",
  projectId: "scholar-zip",
  storageBucket: "scholar-zip.appspot.com",
  messagingSenderId: "690361845578",
  appId: "1:690361845578:web:5c823c00962f97f198a3b3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };