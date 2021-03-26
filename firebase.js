import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmC238CoZk01nwcXUYBJZFUH5r-Xuw5gA",
  authDomain: "viber-2cbd8.firebaseapp.com",
  projectId: "viber-2cbd8",
  storageBucket: "viber-2cbd8.appspot.com",
  messagingSenderId: "314059791853",
  appId: "1:314059791853:web:f429651562934bccbc1be4",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
