import React, { Component } from "react";
import AppBar from "./AppBar";
import PatientProfileComp1 from "./PatientProfileComp1";

class PatientProfile extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppBar />
        <br />
        <br />
        <br />
        <br />
        <PatientProfileComp1 />
      </div>
    );
  }
}

export default PatientProfile;
