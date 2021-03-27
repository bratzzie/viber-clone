import "../styles/globals.css";
import { auth, db } from "../firebase";
import Login from "./login";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          // if it was not created -> create it, if it exists already -> update
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          name: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
