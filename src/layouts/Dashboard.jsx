import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from "@material-ui/core/Button";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import Landing from './Landing';
import Information from './Information';


const drawerWidth = 240;
var user = firebase.auth().currentUser;

const styles = theme => ({
  root: {
    display: 'flex',
    fontFamily:'Open Sans'
  },

  signOut:{
    marginLeft:'40px',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor:"black"
  },
  signOut:{
      marginLeft:'20px',
      height:'50px',
      width:'200px',
      borderRadius:'5px',
      backgroundColor:'Black',
      color:'White',
      fontSize:'18px'

  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  firstList:{
    backgroundColor:'white',
    fontFamily:'Open Sans',
  },
  QRCode:{
      marginLeft:'20px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.default",
    padding: theme.spacing.unit * 3,
  },
});



function PermanentDrawerLeft(props) {
  const { classes } = props;

  
  return (
    <div className={classes.root}>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>

      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWraps>
            <p>SHERM by Avocets</p>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
        <div>
            <img src="https://www.aacci.in/images/core/dr-sachidananda-kamath.jpg" height='350px' width='239px'>
            </img>
        </div>
        
        </div>
        <Divider />
        <List className={classes.firstList}>
        <center>
            <p>Name = Dr Jagjivan Reddy</p>
            <p>E-Mail = drjagjivan@gmail.com</p>
            <p>Contact = 9743820394</p> 
        </center>
            
        </List>
        <Divider/>
        <List>
            Scan the QR code with your app
          <br/>
          <br/>
          <img className = {classes.QRCode}src="https://s3.eu-central-1.amazonaws.com/centaur-wp/econsultancy/prod/content/uploads/archive/images/resized/0002/4236/qr_code-blog-third.png"></img>
           <br/>
           <br/>
           <br/>
        <Landing className={classes.signOut}/>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
            Area1
        </Typography>
        <Typography paragraph>
          Area2
        </Typography>
        
          
      </main>
      
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);