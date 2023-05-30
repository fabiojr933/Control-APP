import firebase from "firebase/compat";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCUhmmw7VrDHPPpTBaZY2Jn3lc3vmATCqE",
  authDomain: "sistemadespesa.firebaseapp.com",
  projectId: "sistemadespesa",
  storageBucket: "sistemadespesa.appspot.com",
  messagingSenderId: "637128014198",
  appId: "1:637128014198:web:e66fac9103f39beb94a257",
  measurementId: "G-65NQL5GR9T"
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default { firebase, db };