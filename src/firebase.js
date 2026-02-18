import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAYNtArFMcdL7ATpBulF9WBbWWKy98BcDA",
  authDomain: "netflix-clone-22354.firebaseapp.com",
  projectId: "netflix-clone-22354",
  storageBucket: "netflix-clone-22354.firebasestorage.app",
  messagingSenderId: "251948928906",
  appId: "1:251948928906:web:545e123c401b34f6ae8273",
  measurementId: "G-12BLG0KN49"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logut = () => {
  signOut(auth);
};

export { auth, db, login, signup, logut };
