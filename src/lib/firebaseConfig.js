import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-0MoI39mzoofpTZo1UltluRLfJ48_Ulw",
  authDomain: "restaurant-phat.firebaseapp.com",
  projectId: "restaurant-phat",
  storageBucket: "restaurant-phat.firebasestorage.app",
  messagingSenderId: "709352894163",
  appId: "1:709352894163:web:21afc2ffa81009e225ee26",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
