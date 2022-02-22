import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { getFirestore, collection, onSnapshot, getDocs } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBNNAnRu-ClUj4ZfRrzvGzwbMXbfIKEy7M",
  authDomain: "letschat-af0ed.firebaseapp.com",
  databaseURL: "https://letschat-af0ed-default-rtdb.firebaseio.com",
  projectId: "letschat-af0ed",
  storageBucket: "letschat-af0ed.appspot.com",
  messagingSenderId: "654601101149",
  appId: "1:654601101149:web:e935cee3bfffbd67b452b4"
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};
export default db;
 