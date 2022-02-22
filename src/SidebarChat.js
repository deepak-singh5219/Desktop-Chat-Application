 import { Avatar } from '@mui/material';
import React, {useState,useEffect} from 'react';
import db from './firebase';
import {Link} from "react-router-dom";

import './SidebarChat.css';
 
 export default function SidebarChat({id, name, addNewChat}) {

    const [seed,seedState] = useState('');  
    const [messages,setMessages] = useState([]); 
    
    useEffect(()=> {
        if(id) {
            db.collection('Rooms').doc(id).collection('messages').orderBy('timestamp','desc').
            onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=> doc.data())))
        }


    },[id]);

    useEffect(() => {
        seedState(Math.floor(Math.random()*5000));

    },[id]);

    const createChat = () => {
         const roomName = prompt("Please enter name for new chat");
           if(roomName){
               db.collection("Rooms").add({
                   name:roomName,
               });
           }
    };

     return !addNewChat ? (
 
        <Link to={`/rooms/${id}`}>

            <div className="sidebarchats">    
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="sidebarchats_info">
                   <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
           </div>
  
            </div>
        </Link>
        
        
     )
     :(
        <div className="sidebarchats" onClick={createChat}>
            <h2>Add New Chat</h2>
        </div>
     )
 }
 