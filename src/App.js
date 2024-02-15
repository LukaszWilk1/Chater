import {useAuthState} from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { useEffect, useState } from "react";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

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
  const [chatRoomName, setChatRoomName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  const handleChange = e => {
    if((e.target.value).trim() !== "") setChatRoomName(e.target.value);
  }

  const getChattRoomName = async () => {
    if((chatRoomName).trim() !== "") {
      try{
        await setDoc(doc(db, "rooms", `${chatRoomName}`), {});
      } catch(e){
        console.log("Error adding data: ", e);
      }
    } else {
      setIsEmpty(true);
    }
  }

  return(
    <div className="w-100 d-flex flex-column justify-content-center p-4">
      <p className="h1 mb-5 text-primary text-center">ENTER ROOM</p>
      <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="chatRoomName" onChange={handleChange} value={chatRoomName}></input>
            {isEmpty ? <p className="text-danger">You must name the room!</p> : <></>}
      </div>
      <button className="btn btn-primary w-80 mt-2" onClick={getChattRoomName}>Enter</button>
      <button className="btn btn-primary w-80 mt-4" onClick={logOut}>Logout</button>
    </div>
  );
}

function App() {

  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
    .then(result => {
      //Singed in
    })
    .catch(err => {
      if(err) setLoading(false);
    })
    /*if(windowWidth > 768){
      signInWithPopup(auth, provider);
    } else if (windowWidth <= 768) {
      signInWithRedirect(auth, provider);
    }*/
  }

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return (
    <div className="w-100 d-flex flex-column justify-content-center p-4">
      {loading ? <p>Loading...</p> : (user ? <Chatroom/> : <Signin logIn={logIn}/>)}
    </div>
  )
}

export default App;
