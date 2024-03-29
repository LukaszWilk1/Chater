import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Signin from './Signin.jsx'
import Message from "./Message.jsx";
import EnteringRoom from "./EnteringRoom.jsx";
import ChatRoomLoading from "./ChatRoomLoading.jsx";


const firebaseConfig = {
  apiKey: "AIzaSyBJRpilIgvYbqX5RzsJ6JgYk3Oy-Mz7nCY",
  authDomain: "chater-56a0a.firebaseapp.com",
  projectId: "chater-56a0a",
  storageBucket: "chater-56a0a.appspot.com",
  messagingSenderId: "683581810189",
  appId: "1:683581810189:web:7685ea2afd95644fb55744",
  measurementId: "G-TZ7E8Z2B8K"
};

firebase.initializeApp(firebaseConfig)
let firestore = firebase.firestore();

const auth = getAuth();

const provider = new GoogleAuthProvider();

const ChatPannel = prop => {

  const root = document.getElementById("root");

  root.classList.add('w-100');
  root.classList.add('h-100');
  
  if(prop.roomName === ''){
    console.log("PROP ROOM NAME EMPTY");
  };
  const messageRef = firestore.collection(prop.roomName);
  const query = messageRef.orderBy('createdAt', 'desc');
  const [messages] = useCollectionData(query, {idField: 'id'});

  const exitRoom = () => {
    const root = document.getElementById("root");

    root.classList.remove('w-100');
    root.classList.remove('h-100');
    prop.action();
  }

  const [inputVal, setInputVal] = useState('');

  const handleChange = e => {
    setInputVal(e.target.value);
  }

  const send = async() => {

    const { uid, photoURL } = auth.currentUser;

    if(inputVal.trim() !== ''){
      await messageRef.add({
        text: inputVal,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      });
    } else {
      //
    }
    setInputVal('');
  };

  return (
    <div className="w-100 h-100 d-flex p-0">
      <div id="ChatPanel" className="h-100 w-20 p-2 ps-0 d-flex flex-column col-3 border-end border-primary">
        <div className="h-50 d-flex flex-column justify-content-start">
          <p className="h1 text-center text-primary">{prop.roomName}</p>
        </div>
        <div className="h-50 d-flex flex-column justify-content-end">
          <i className="bi bi-arrow-return-left btn btn-primary mb-1" onClick={exitRoom}></i>
          <i className="bi bi-box-arrow-left btn btn-primary" onClick={prop.logOut}></i>
        </div>
      </div>
      <div id="MessagePanel" className="h-100 w-20 p-2 d-flex flex-column col-9">
        <div className="overflow-y-auto flex-grow-1 autoscrollable-wrapper">
          {messages && messages.map(msg => <Message key={msg.id} image={msg.photoURL} text={msg.text} uid={msg.uid} createdAt={msg.createdAt}/>)}
        </div>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Your Message" aria-label="Recipient's username" aria-describedby="button-addon2" value={inputVal} onChange={handleChange}></input>
          <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  )
}

function Chatroom(prop) {

  const [chatRoomName, setChatRoomName] = useState('');
  const [isIn, setIsIn] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);

  useEffect(() => {
    if(window.localStorage.getItem('chatRoomName') !== "" && window.localStorage.getItem('chatRoomName') !== null) setChatRoomName(window.localStorage.getItem('chatRoomName'));
    setIsIn(window.localStorage.getItem('isIn'));
  }, []);

  const handleChange = e => {
    setChatRoomName(e.target.value);
  }

  const getChattRoomName = async () => {

    if((chatRoomName).trim() !== "") {
      setIsIn(true);
      setEmptyInput(false);
      window.localStorage.setItem('chatRoomName', chatRoomName);
      window.localStorage.setItem('isIn', isIn);
    } else {
      setEmptyInput(true);
    }
  }

  const exitRoomFun = () => {
    setIsIn(false);
    window.localStorage.removeItem('chatRoomName');
    window.localStorage.removeItem('isIn');
  }

  return(
      <div className="w-100 h-100">
        {isIn ? <ChatPannel action={exitRoomFun} logOut={prop.logOut} roomName={chatRoomName}></ChatPannel> : <EnteringRoom isEmpty={emptyInput} action={exitRoomFun} handleChange={handleChange} chatRoomName={chatRoomName} getChattRoomName={getChattRoomName} logOut={prop.logOut}></EnteringRoom>}
    </div>
  );
}

function App() {

  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(window.localStorage.getItem('isSignedIn'));
  }, [])

  useEffect(() => {
    setIsSignedIn(window.localStorage.getItem('isSignedIn'));
  }, [user]);

  const logIn = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
    .then(result => {
      setIsSignedIn(true);
      window.localStorage.setItem('isSignedIn', true);
    })
    .catch(err => {
      if(err) setLoading(false);
    })
  }

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const localLogOut = () => {
    signOut(auth).then(() => {
      window.localStorage.clear();
      setIsSignedIn(false);
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div id="underRoot" className="w-100 d-flex flex-column justify-content-center p-2">
      {loading ? <ChatRoomLoading/> : (isSignedIn ? <Chatroom logOut={localLogOut}/> : <Signin logIn={logIn}/>)}
    </div>
  )
}

export default App;