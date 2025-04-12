// Import Firebase core and auth
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDf3u6owMasE25aTIWxVADfk0_mFOxzCbs",
  authDomain: "event-planner-pro-89c2c.firebaseapp.com",
  projectId: "event-planner-pro-89c2c",
  storageBucket: "event-planner-pro-89c2c.firebasestorage.app",
  messagingSenderId: "967476228089",
  appId: "1:967476228089:web:5fc94e7d356775eafe5728",
  measurementId: "G-ETB1KHM60J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Exported auth functions
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function onUserChange(callback) {
  onAuthStateChanged(auth, callback);
}
