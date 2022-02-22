import React, {useEffect, useState} from "react";
import './App.css';
import Sidebar from './Sidebar.js'
import Chat from './Chat.js';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login.js';
import {useStateValue} from './StateProvider';



function App() {

  
  const [{user}, dispatch] = useStateValue();


  return (
    <div className="app">
      {!user ? (
        <Login/>
      ):(
      <div className="app_body">
        <Router>
            <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat/>
            </Route>
            <Route path="/">
              <div className="blankScreen">
                <h1><span>Welcome</span><span>To</span><span>LetsChat</span></h1>
                <img src={user?.photoURL} alt="Girl in a jacket" width="200" height="200"/>
                <h2>
                {user?.displayName}
                  </h2>

              </div>
            </Route>

          </Switch>
        </Router>
       
      </div>

      )}
    </div>

  );
}

export default App;
