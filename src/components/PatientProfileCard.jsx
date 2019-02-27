import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    
  },
  card: {
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
          <div style={{color:"Red",backgroundColor:"#FFD662",margin:'5px'}}>
          <div style={{padding:'20px'}}>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            PatientName: {props["name"]}
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Age: {props["age"]}
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Sex: {props["sex"]}
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Weight: 100kg
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Height: 1.75m
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Smoking: No
          </Typography>
          <Typography variant="h5" component="h2" style={{fontFamily:'Lato'}}>
            Exercise: Yes
          </Typography>
          </div>
         
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
