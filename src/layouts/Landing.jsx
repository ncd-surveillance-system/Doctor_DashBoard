import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

class Landing extends Component {
  state = { isSignedIn: true };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  };

  logout = () => {
    firebase.auth().signOut();
    this.setState({ isSignedIn: false });
  };

  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          <div>
            <Button variant="contained" color="primary" onClick={this.logout}>
              Sign out
            </Button>
          </div>
        ) : (
          <Redirect from="/index" to="/signIn" />
        )}
      </div>
    );
  }
}

export default Landing;
