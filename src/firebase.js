import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_JL0j6jVP4H6BT88jRAkFljV9AAxE0BE",
  authDomain: "ib-question-bank-5b297.firebaseapp.com",
  projectId: "ib-question-bank-5b297",
  storageBucket: "ib-question-bank-5b297.firebasestorage.app",
  messagingSenderId: "1006937286803",
  appId: "1:1006937286803:web:58b5bea86709e9c5320566",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
