import {useAuthState} from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBJRpilIgvYbqX5RzsJ6JgYk3Oy-Mz7nCY",
  authDomain: "chater-56a0a.firebaseapp.com",
  projectId: "chater-56a0a",
  storageBucket: "chater-56a0a.appspot.com",
  messagingSenderId: "683581810189",
  appId: "1:683581810189:web:7685ea2afd95644fb55744",
  measurementId: "G-TZ7E8Z2B8K"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

  const logIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="w-100 d-flex flex-column justify-content-center p-4">
    <p className="h1 mt-4 mb-4 text-primary text-center">CHATER</p>
    <button type="button" className="btn btn-danger w-80 mt-4 mb-4" onClick={logIn}>LOGIN WITH GOOGLE</button>
    {user ? console.log("elo") : console.log("nie elo")}
    </div>
  );
}

export default App;
