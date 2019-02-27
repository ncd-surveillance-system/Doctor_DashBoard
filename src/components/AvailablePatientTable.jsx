import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";
import { Redirect, Router } from "react-router-dom";
import hist from "../history";
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const styles = theme => ({
  root: {
    width: "200%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    marginLeft: "7.5%"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class CustomizedTable extends Component {
  state = { userData: "" };

  componentDidMount = () => {
    firebase
      .database()
      .ref("patients")
      .once("value", snapshot => {
        this.setState({ userData: snapshot.val() });
      });
  };

  onRowItemClick(user) {
    // this.state.userData[user];
    console.log(user);
    localStorage.setItem("user", user);
    hist.push("/index/patientList/patientProfile");
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>UserName</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Sex</CustomTableCell>
              <CustomTableCell>Age</CustomTableCell>
              <CustomTableCell>Phone Number</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(this.state.userData).map(user => (
              <TableRow
                className={classes.row}
                key={user}
                onClick={() => this.onRowItemClick(user)}
              >
                <CustomTableCell component="th" scope="row">
                  {user}
                </CustomTableCell>
                <CustomTableCell>
                  {this.state.userData[user]["personal_details"]["name"]}
                </CustomTableCell>
                <CustomTableCell>
                  {this.state.userData[user]["personal_details"]["sex"]}
                </CustomTableCell>
                <CustomTableCell>
                  {this.state.userData[user]["personal_details"]["age"]}
                </CustomTableCell>
                <CustomTableCell>
                  {this.state.userData[user]["personal_details"]["phoneNumber"]}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedTable);
