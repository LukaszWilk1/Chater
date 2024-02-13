import {useAuthState} from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { useEffect, useState } from "react";

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

const windowWidth = window.innerWidth;
console.log(windowWidth);

const provider = new GoogleAuthProvider();

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

function Signin(props) {
  return (
    <div className="w-100 d-flex flex-column justify-content-center p-4">
    <p className="h1 mt-4 mb-4 text-primary text-center">CHATER</p>
    <button type="button" className="btn btn-danger w-80 mt-4 mb-4" onClick={props.logIn} name="loginButton">LOGIN WITH GOOGLE</button>
    </div>
  );
}

function Chatroom() {
  return(
    <button onClick={logOut}>Logout</button>
  );
}

function App() {

  const logIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider);
    /*if(windowWidth > 768){
      signInWithPopup(auth, provider);
    } else if (windowWidth <= 768) {
      signInWithRedirect(auth, provider);
    }*/
  }

  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <div  className="w-100 d-flex flex-column justify-content-center p-4">
      {loading ? <p>Loading...</p> : (user ? <Chatroom/> : <Signin logIn={logIn}/>)}
    </div>
  )
}

export default App;
