import React, { Component } from "react";
import AppBar from "./AppBar";
import AvailablePatientTable from "./AvailablePatientTable";

class PatientList extends Component {
  state = {};
  render() {
    return (
      <div>
        <AppBar />
        <br />
        <br />
        <br />
        <AvailablePatientTable />
      </div>
    );
  }
}

export default PatientList;
