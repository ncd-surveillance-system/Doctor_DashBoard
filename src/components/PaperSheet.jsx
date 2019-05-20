import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: "#E8FFFF"
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Quick-Walking:{props["quick_walking"]}
          <br/>
          Exercise More than 30 minutes:{props["excersize_more_than_30_min"]}
          <br/>
          Medication for Diabetes:{props["medication_for_diabetes"]}
          <br/>
          Medication for hypertension:{props["medication_for_hypertension"]}
          <br/>
          Other Symptopms:{props["othet_symptoms"]}
          <br/>
          {/* Medicine:{props["prescription"]} */}
          <br/>
          

        </Typography>
        <Typography component="p">17-05-2019</Typography>
      </Paper>
      <br />
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
