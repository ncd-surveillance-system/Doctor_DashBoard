import React, { Component } from "react";
import SimpleCard from "./PatientProfileCard";
import PaperSheet from "./PaperSheet";
import FloatingActionButtons from "./fab";
import firebase from "firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ReactLoading from "react-loading";
import Button from "@material-ui/core/Button";
import FileBase64 from "react-file-base64";

class PatientProfile extends Component {
  state = {
    name: "",
    age: "",
    sex: "",
    smoking: "No",
    uid: "",
    fab_open: false,
    prescription: ``,
    description: ``,
    location: ``,
    prev_presc: []
  };
  componentDidMount = () => {
    firebase
      .database()
      .ref("patients/" + localStorage.getItem("user"))
      .once("value", snapshot => {
        var data = snapshot.val();
        console.log(data);
        this.setState({
          name: data["personal_details"]["name"],
          age: data["personal_details"]["age"],
          sex: data["personal_details"]["sex"],
          uid: data["personal_details"]["uid"],
          prev_presc: data["prescriptions"]
        });
      });
  };

  handleFabOnclick = () => {
    this.setState({ fab_open: true });
    console.log("cl");
  };

  handleFabClose = () => {
    this.setState({ fab_open: false });
  };

  hadleFabSubmit = () => {
    console.log("subm");
    firebase
      .database()
      .ref("patients/" + localStorage.getItem("user") + "/prescriptions")
      .push({
        prescription: this.state.prescription,
        description: this.state.description,
        location: this.state.location
      })
      .then(data => {
        //success callback
        console.log("data ", data);
        this.setState({ fab_open: false });
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  };

  prescription_handler = e => {
    this.setState({ prescription: e.target.value });
  };

  description_handler = e => {
    this.setState({ description: e.target.value });
  };

  location_hanlder = e => {
    this.setState({ location: e.target.value });
  };

  render() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Lato" rel="stylesheet"></link>
        <div
          style={{ width: "1450px", marginRight: "25px", marginLeft: "25px" }}
        >
          <SimpleCard
            name={this.state.name}
            age={this.state.age}
            sex={this.state.sex}
            uid={this.state.uid}
          />

          <center>
            <h1>Medical Records</h1>
          </center>
          {/* Just iterate over prascription and display it */}
          {Object.keys(this.state.prev_presc).map(presc => (
            <PaperSheet prescription={presc} />
          ))}
          <FloatingActionButtons onClick={this.handleFabOnclick} />

          <Dialog
            open={this.state.fab_open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              <center>Add a New Diagnosis</center>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter the Details of Diagnosis below{" "}
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="desrciption"
                label="Description"
                type="text"
                fullWidth
                onChange={this.description_handler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="prescription"
                label="Prescription"
                type="text"
                fullWidth
                onChange={this.prescription_handler}
              />
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="text"
                onChange={this.location_hanlder}
                fullWidth
              />

              <br />
              <br />

              {/* <FileBase64 multiple={true} onDone={this.getFiles.bind(this)} /> */}

              <div id="loadingButton" hidden>
                <center>
                  <ReactLoading
                    type="spin"
                    color="black"
                    height="10%"
                    width="10%"
                  />
                </center>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleFabClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.hadleFabSubmit} color="primary">
                ADD
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default PatientProfile;
