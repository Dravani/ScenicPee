import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkdW64vDMsdRfPWdmFooIWwIweJHfxftM",
  authDomain: "scenicpee.firebaseapp.com",
  projectId: "scenicpee",
  storageBucket: "scenicpee.firebasestorage.app",
  messagingSenderId: "270593627450",
  appId: "1:270593627450:web:5023abd91775dbd7076c03",
  measurementId: "G-T105N1QLEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
