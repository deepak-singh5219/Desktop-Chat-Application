import React, {useEffect, useState} from 'react';
import './Chat.css';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import photo from './motu.jpg';
import { IconButton } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import {useParams} from 'react-router-dom';
import db from './firebase.js';
import {Link} from "react-router-dom";  
import {useStateValue} from './StateProvider';
import firebase from 'firebase';


 

export default function Chat() {

    const [input,setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setroomName] = useState("");
    const [seed,seedState] = useState('');  
    const [messages,setMessages] = useState([]); 
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        seedState(Math.floor(Math.random()*5000));

    },[roomId]);

    useEffect(()=> {
        if(roomId) {
            db.collection('Rooms').doc(roomId).onSnapshot(snapshot => (
                setroomName(snapshot.data().name)
            ))

            db.collection('Rooms').doc(roomId).collection('messages').orderBy('timestamp', "asc").onSnapshot((snapshot)=> 
            setMessages(snapshot.docs.map((doc)=> doc.data()))
            );

        }
    },[roomId]);
     
    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('Rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

   
    return (
       <div className="Chat">

           <div className="chat_header">
               <div className="chat_header_info">
               <IconButton>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                </IconButton>
               <h2>{roomName}</h2>
               
               </div>
           

           <div className="chat_headerRight">
       <IconButton>
           <SearchIcon fontSize="large"/>
       </IconButton>
       <IconButton>
           <AttachFileIcon fontSize="large"/>
           </IconButton>
       <IconButton>
           <MoreVertIcon fontSize="large"/>
           </IconButton>
           </div>

           </div>

           <div className="chat_body">
               {messages.map((message)=> (

               <p className={`chat_message ${(message.name === user?.displayName) && "chat_sent"} `}>
                   <span className="chat_name">{message.name}</span>
                   {message.message}
                   <span className="chat_time">{
                       new Date(message.timestamp?.toDate()).toUTCString()
                   }</span>
               </p>
               ))}
              

           </div>

           <div className="chat_footer">
               <div className="footer_container">
                   <IconButton>
               <EmojiEmotionsIcon fontSize="large"/>
               </IconButton>
               <form onSubmit={sendMessage}>
               <input value={input} 
               onChange={(e)=> setInput(e.target.value)}
                placeholder="Type your message here" type="text" required/>
               <button type="submit"></button>
               </form>
               
               <IconButton>
               <SendIcon fontSize="large"/>
               </IconButton>
               </div>


           </div>

       </div>
    )
}
