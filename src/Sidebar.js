import React,{useState, useEffect} from 'react';

import DataSaverOffIcon from '@mui/icons-material/DataSaverOff';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './sidebar.css';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat.js';
import  Avatar from '@mui/material/Avatar';
import photo from './motu.jpg';
import db from './firebase.js';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { Unsubscribe } from '@mui/icons-material';
import {useStateValue} from './StateProvider';



export default function Sidebar() {

   
    const [rooms,setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();
    
    
    useEffect(() => {
      db.collection("Rooms").onSnapshot((snapshot)=>
        setRooms(
            snapshot.docs.map((doc)=> ({ 
                id: doc.id,
                data: doc.data(),
            }))
        ));

    },[]);
    return (
        <div className="sidebar">

            <div className="sidebar_header">
                <IconButton>
                <Avatar src={user?.photoURL} />
                </IconButton>

                <div className="sidebar_header_right">
                <IconButton>  
                <DataSaverOffIcon/>
                </IconButton>

                <IconButton>
                <MessageIcon/>
                </IconButton>

                <IconButton>
                <MoreVertIcon/>
                </IconButton>



                </div>
               

               

            </div>

            <div className="sidebar_search">
                <div className="search_container">
                   <IconButton> <SearchIcon fontSize="large"/> </IconButton>
                    <input placeholder="Find Someone" type="text"/>
                </div>


            </div>

            <div className="sidebar_chats">
               
                   <SidebarChat addNewChat />

                  {rooms.map((room)=> (
                      <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                  ))} 
                    
            </div>
          

        </div>
    )
}
