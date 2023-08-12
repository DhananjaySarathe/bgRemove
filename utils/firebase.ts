// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"; // Import the necessary Firestore functions


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmDhc3S3NfQQN3On6tGYRPxcTEMEFKgbU",
    authDomain: "imagedata-d5bd0.firebaseapp.com",
    projectId: "imagedata-d5bd0",
    storageBucket: "imagedata-d5bd0.appspot.com",
    messagingSenderId: "143849225139",
    appId: "1:143849225139:web:1f204bd89cb1e4355fa9c6",
    // measurementId: "G-HKM3XGMC1R"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export const database = {
  images: collection(firestore, 'imageData') // Use the collection function from the Firestore module
};


