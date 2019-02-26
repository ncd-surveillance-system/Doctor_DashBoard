import React, { Component } from "react";
import firebase from "firebase";

var user = firebase.auth().currentUser;
var name, email, photoUrl;
if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
}
  
class Information extends Component {
  state = { isSignedIn: true };
    
  render() {
    return (
        <div>
            <p>Name: {name}</p>
            <p>E-Mail: {email}</p>
        </div>
    );
  }
}

export default Information;
