import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import firebase from "firebase";
import { Router, Route, Switch, Redirect, NavLink } from "react-router-dom";
import Landing from "./Landing";
import PatientList from "../components/PatientList";
import PatientProfile from "../components/PatientProfile";
import QRCode from "qrcode.react";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    fontFamily: "Open Sans",
    backgroundColor:""
  },

  signOut: {
    marginLeft: "40px"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "black"
  },
  signOut: {
    marginLeft: "20px",
    height: "50px",
    width: "200px",
    borderRadius: "5px",
    backgroundColor: "Black",
    color: "White",
    fontSize: "18px"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  firstList: {
    backgroundColor: "white",
    fontFamily: "Open Sans"
  },
  QRCode: {
    marginLeft: "60px"
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.default",
    padding: theme.spacing.unit * 3
  }
});

class PermanentDrawerLeft extends Component {
  state = {
    isSignedIn: true,
    email: "",
    contact: "8147318621",
    name: "",
    photoURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE8KtKj_zXIxHEt7KjVWuUdjfq_WNbfMf5x3AGaPfkW6iSplZI"
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      this.setState({ isSignedIn: !!user, email: user.email });
      if (user.photoURL) {
        this.setState({ photoURL: user.photoURL });
      }
      if (user.displayName) {
        this.setState({ name: user.displayName });
        localStorage.setItem("doctor_username", user.displayName);
      }
      if (user.phoneNumber) {
        this.setState({ contact: user.phoneNumber });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.isSignedIn ? (
          <div className={classes.root}>
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans"
              rel="stylesheet"
            />

            <CssBaseline />

            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
              anchor="left"
            >
              <div className={classes.toolbar}>
                <div>
                  <img src={this.state.photoURL} height="240px" width="239px" />
                </div>
              </div>
              <Divider />
              <List className={classes.firstList}>
                <center>
                  <p>Dr. {this.state.name}</p>
                  <p>{this.state.email}</p>
                  <p>{this.state.contact}</p>
                </center>
              </List>
              <Divider />
              <List>
                Scan the QR code with your app
                <br />
                <br />
                <QRCode value={this.state.name} className={classes.QRCode} />
                <br />
                <br />
                <br />
                <Landing className={classes.signOut} />
              </List>
            </Drawer>
            <Switch>
              <Route exact path="/index/patientList" component={PatientList} />
              <Route
                path="/index/patientList/patientProfile"
                component={PatientProfile}
              />
              <Redirect from="/index" to="index/patientList" />
            </Switch>
          </div>
        ) : (
          <Redirect from="/index" to="/signIn" />
        )}
      </div>
    );
  }
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
