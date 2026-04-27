import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXzNAqXbDsKp8yGXyrtSVJhlHIzkHIJO0",
  authDomain: "ai-task-manager-e8151.firebaseapp.com",
  projectId: "ai-task-manager-e8151",
  storageBucket: "ai-task-manager-e8151.firebasestorage.app",
  messagingSenderId: "755887015623",
  appId: "1:755887015623:web:97168895dcc55fb54160e2",
  measurementId: "G-Z82TQ7Q33X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);