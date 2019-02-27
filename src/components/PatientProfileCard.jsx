import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    color: "White",
    backgroundColour: "Black"
  },
  card: {
    Width: ""
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Patient Name
          </Typography>

          <Typography variant="h5" component="h2">
            {props["name"]}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            <span>Age: {props["age"]} </span>
            <br />
            <span>Sex: {props["sex"]}</span>
            <br />
            <span>Weight: 100Kg</span>
            <br />
            <span>Height: 1.75m</span>
            <br />
            <span>Smoking: No</span>
            <br />
            <span>Exercise: Yes</span>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
