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

  const root = document.getElementById("root");

  root.classList.remove("h-100");
  root.classList.remove("w-100");


  return (
    <div className="w-100 d-flex flex-column justify-content-center p-4">
    <p className="h1 mt-4 mb-4 text-primary text-center">CHATER</p>
    <button type="button" className="btn btn-danger w-80 mt-4 mb-4" onClick={props.logIn} name="loginButton">LOGIN WITH GOOGLE</button>
    </div>
  );
};

const ChatPannel = prop => {
  
  const root = document.getElementById("root");
  const underRoot = document.getElementById("underRoot");

  root.classList.add("h-100");
  root.classList.add("w-100");

  underRoot.classList.remove("justify-content-center");
  underRoot.classList.add("justify-content-left");

  const exitRoom = () => {
    prop.action();
  }

  return (
    <div id="ChatPanel" className="w-100 d-flex flex-column justify-content-center p-2">
      <p className="h1 mt-2 mb-2 text-primary text-center">WELCOME IN THE {prop.roomName} CHAT ROOM</p>
      <div id="butonsDiv" className="d-flex justify-content-center">
      <button className="btn btn-primary w-50 me-1" onClick={exitRoom}>EXIT ROOM</button>
      <button className="btn btn-primary w-50 ms-1" onClick={prop.logOut}>Logout</button>
      </div>
    </div>
  )
}

const ChatPanelLoading = () => {

  const root = document.getElementById("root");
  const underRoot = document.getElementById("underRoot");

  root.classList.add("h-100");
  root.classList.add("w-100");

  underRoot.classList.remove("justify-content-center");
  underRoot.classList.add("justify-content-left");

  return(
    <div className="w-100 d-flex flex-column justify-content-center p-2 placeholder-glow" aria-hidden="true">
      <p className="h1 mt-2 mb-2 text-primary text-center placeholder-glow"><span class="placeholder">WELCOME IN THE CHAT ROOM</span></p>
      <button className="btn btn-primary w-80 mt-2 disabled placeholder w-90" aria-disabled="true"></button>
      <button className="btn btn-primary w-80 mt-2 disabled placeholder w-90" aria-disabled="true"></button>
    </div>
  )
}

function Chatroom() {

  const root = document.getElementById("root");

  root.classList.remove("h-100");
  root.classList.remove("w-100");


  const [chatRoomName, setChatRoomName] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setChatRoomName(e.target.value);
  }

  const getChattRoomName = async () => {
    setLoading(true);
    if((chatRoomName).trim() !== "") {
      try{
        await setDoc(doc(db, "rooms", `${chatRoomName}`), {});
        setLoading(false);
        setIsIn(true);
      } catch(e){
        console.log("Error adding data: ", e);
      }
    } else {
      setIsEmpty(true);
      setLoading(false);
    }
  }

  const exitRoomFun = () => {
    setIsIn(false);
  }

  return(
      <div>
        {loading ? <ChatPanelLoading></ChatPanelLoading> : (isIn ? <ChatPannel action={exitRoomFun} logOut={logOut} roomName={chatRoomName}></ChatPannel> : <div className="w-100 d-flex flex-column justify-content-center p-2">
        <p className="h1 mb-5 text-primary text-center">ENTER ROOM</p>
        <div className="input-group input-group-sm mb-3">
         <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" name="chatRoomName" onChange={handleChange} value={chatRoomName}></input>
      </div>
      {isEmpty ? <p className="text-danger text-center">You must name the room!</p> : <></>}
      <button className="btn btn-primary w-80 mt-2" onClick={getChattRoomName}>Enter</button>
      <button className="btn btn-primary w-80 mt-4" onClick={logOut}>Logout</button>
          </div>)}
    </div>
  );
}

const ChatRoomLoading = () => {
  return(
    <div className="w-100 d-flex flex-column justify-content-center p-2 placeholder-glow" aria-hidden="true">
        <p className="h1 mb-5 text-primary text-center placeholder-glow"><span className="placeholder">ENTER ROOM</span></p>
        <span class="placeholder col-12 bg-light"></span>
      <button className="btn btn-primary w-80 mt-2 disabled placeholder w-90" aria-disabled="true"></button>
      <button className="btn btn-primary w-80 mt-4 disabled placeholder w-90" aria-disabled="true"></button>
    </div>
  )
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
    <div id="underRoot" className="w-100 d-flex flex-column justify-content-center p-2">
      {loading ? <ChatRoomLoading/> : (user ? <Chatroom/> : <Signin logIn={logIn}/>)}
    </div>
  )
}

export default App;
