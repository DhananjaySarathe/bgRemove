// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"; // Import the necessary Firestore functions


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAteo240DFSDgswifBeByMzH0pVYvtOz9E",
  authDomain: "imagedb-cccd8.firebaseapp.com",
  projectId: "imagedb-cccd8",
  storageBucket: "imagedb-cccd8.appspot.com",
  messagingSenderId: "129897957886",
  appId: "1:129897957886:web:e7d154f1ea99cc938598af",
  measurementId: "G-70C1S1K2XQ"
};
// Initialize Firebase
let firestore = null;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  firestore = getFirestore(app);
}

export const database = {
  images: firestore ? collection(firestore, 'imageData') : null
};


