import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAYNtArFMcdL7ATpBulF9WBbWWKy98BcDA",
  authDomain: "netflix-clone-22354.firebaseapp.com",
  projectId: "netflix-clone-22354",
  storageBucket: "netflix-clone-22354.firebasestorage.app",
  messagingSenderId: "251948928906",
  appId: "1:251948928906:web:545e123c401b34f6ae8273"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      name,
      authProvider: "local",
      email
    });

    toast.success("Account created");
    return true;
  } catch (error) {
    toast.error(error.code.split("/")[1].replaceAll("-", " "));
    return false;
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes("google.com")) {
        toast.error("This email uses Google login. Please sign in with Google.");
        return false;
      }
    }

    toast.error("Invalid email or password");
    return false;
  }
};

const googleProvider = new GoogleAuthProvider();

const googleLogin = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: user.displayName,
      authProvider: "google",
      email: user.email
    });

    return true;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") return false;

    if (error.code === "auth/account-exists-with-different-credential") {
      const email = error.customData.email;
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.includes("password")) {
        toast.error("Login with email & password first to link Google.");
      }
      return false;
    }

    toast.error(error.code.split("/")[1].replaceAll("-", " "));
    return false;
  }
};

const linkEmailPassword = async (email, password) => {
  try {
    const credential = EmailAuthProvider.credential(email, password);
    await linkWithCredential(auth.currentUser, credential);
    toast.success("Account linked successfully");
    return true;
  } catch (error) {
    toast.error(error.code.split("/")[1].replaceAll("-", " "));
    return false;
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  signup,
  login,
  googleLogin,
  linkEmailPassword,
  logout
};
