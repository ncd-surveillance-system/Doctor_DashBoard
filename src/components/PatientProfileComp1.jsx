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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow:1
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  grid:{
    flexDirection:'row',
    flexWrap:''
  }
});

class PatientProfile extends Component {
  state = {
    name: "",
    age: "",
    sex: "",
    smoking: "No",
    uid: "",
    fab_open: false,
    othet_symptoms: ``,
    excersize_more_than_30_min: ``,
    medication_for_diabetes: ``,
    medication_for_hyperlipidemia: "",
    medication_for_hypertension: "",
    quick_walking: "",
    prescription: "",
    dosage: "",
    prev_presc: ""
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
          prev_presc: data["diagnosis"]
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
    var presc = {};
    presc[this.state.prescription] = this.state.dosage;
    console.log(presc);
    firebase
      .database()
      .ref("patients/" + localStorage.getItem("user") + "/diagnosis")
      .push({
        othet_symptoms: this.state.othet_symptoms,
        excersize_more_than_30_min: this.state.excersize_more_than_30_min,
        medication_for_diabetes: this.state.medication_for_diabetes,
        medication_for_hyperlipidemia: this.state.medication_for_hyperlipidemia,
        medication_for_hypertension: this.state.medication_for_hypertension,
        quick_walking: this.state.quick_walking,
        prescription: presc
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

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value);
  };
  handlePresc = e => {
    this.setState({ dosage: e.target.value });
    console.log(e.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Lato"
          rel="stylesheet"
        />
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
          <div style={{}}>
          <Grid item xs={12}>
            {/* Just iterate over prascription and display it */}
            {Object.keys(this.state.prev_presc).map(presc => (
            <PaperSheet key={presc} {...this.state.prev_presc[presc]} />
          ))}
          </Grid>
          </div>
          
          
          
          
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
                id="othet_symptoms"
                label="Symptoms"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="excersize_more_than_30_min"
                label="Excersize more than 30 min"
                type="text"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                autoFocus
                margin="dense"
                id="medication_for_diabetes"
                label="Medication for diabetes exist?"
                type="text"
                onChange={this.handleInputChange}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="medication_for_hyperlipidemia"
                label="Medication for hyperlipidemia exist?"
                type="text"
                onChange={this.handleInputChange}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="medication_for_hypertension"
                label="Medication for hypertension exist?"
                type="text"
                onChange={this.handleInputChange}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="quick_walking"
                label="Do patient Excersize? "
                type="text"
                onChange={this.handleInputChange}
                fullWidth
              />

              <form className={classes.root} autoComplete="off">
                <TextField
                  id="prescription"
                  label="Medicine Name"
                  defaultValue=""
                  className={classes.textField}
                  onChange={this.handleInputChange}
                  margin="normal"
                />
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-dosage-simple"
                  >
                    Dosage
                  </InputLabel>
                  <Select
                    value={this.state.dosage}
                    onChange={this.handlePresc}
                    id="dosage"
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="dosage"
                        id="outlined-dosage-simple"
                      />
                    }
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"1-0-0"}>1-0-0</MenuItem>
                    <MenuItem value={"0-1-0"}>0-1-0</MenuItem>
                    <MenuItem value={"0-0-1"}>0-0-1</MenuItem>
                    <MenuItem value={"1-1-0"}>1-1-0</MenuItem>
                    <MenuItem value={"0-1-1"}>0-1-1</MenuItem>
                    <MenuItem value={"1-0-1"}>1-0-1</MenuItem>
                    <MenuItem value={"1-1-1"}>1-1-1</MenuItem>
                  </Select>
                </FormControl>
              </form>

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

export default withStyles(styles)(PatientProfile);
