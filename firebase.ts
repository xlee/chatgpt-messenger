import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCViH0D_X61QTgBpBrUCSMzydhpNYuTgg0",
	authDomain: "chatgpt-messenger-e1289.firebaseapp.com",
	projectId: "chatgpt-messenger-e1289",
	storageBucket: "chatgpt-messenger-e1289.appspot.com",
	messagingSenderId: "942841853744",
	appId: "1:942841853744:web:af006229463d4275fdbaf5"
  };
  
  // Initialize Firebase - Singleton Pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };