import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "watch-party-yt.firebaseapp.com",
  projectId: "watch-party-yt",
  storageBucket: "watch-party-yt.appspot.com",
  messagingSenderId: "292814354385",
  appId: "1:292814354385:web:658cb12ea6f452347d52f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Auth state will only persist in current session/tab
setPersistence(auth, browserSessionPersistence);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db }