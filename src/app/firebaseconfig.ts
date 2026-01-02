// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCtTdrlFw9oHzDlAdlauJ0PN911WSfoL4E",
  authDomain: "online-intership-management.firebaseapp.com",
  projectId: "online-intership-management",
  storageBucket: "online-intership-management.firebasestorage.app",
  messagingSenderId: "45590709696",
  appId: "1:45590709696:web:f08efac072cbfc41ad3425",
  measurementId: "G-67H5Q0CLX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);