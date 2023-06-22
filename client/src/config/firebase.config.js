import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbaCHYygI5-BOKQeGz2iLPBjgnvngNZCw",
  authDomain: "chai-del.firebaseapp.com",
  projectId: "chai-del",
  storageBucket: "chai-del.appspot.com",
  messagingSenderId: "279367253877",
  appId: "1:279367253877:web:85a08987f9815309a69d3c",
  measurementId: "G-K5B91ZP2K5",
};

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
