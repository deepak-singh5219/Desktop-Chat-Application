import React, {useRef} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import './login.css';
import {auth, provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import {actionTypes} from './reducer';


export default function Login() {

  const [{},dispatch] = useStateValue();
 
 const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    }
      ).catch((error) => alert(error.message));

  };

  
  return (
    <div className="main">
    <div className="loginPortal">
      <Container>
      <span><h1>Welcome to LetsChat</h1></span>
      <Button onClick={signIn} className="btn" type="submit">Sign In with Google</Button>
      </Container>
      </div>
      </div>
  )
}
