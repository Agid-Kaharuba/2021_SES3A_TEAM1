
import React, { useState, useContext } from "react";
import { Button, TextField, Container, Typography, IconButton, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import api from '../../helpers/api'
import { AuthContext } from "../../context/auth";
import burger from "../../images/burger.jpg";
import burgerdefault from "../../images/training-photos/burgerdefault.jpg"
import doublepatty from "../../images/training-photos/doublepatty.png"
import fries from "../../images/training-photos/fries.png"


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  textField: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  typography: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0.5)
  },
  profileImg: {
    position: "relative",
    alignSelf: "start"
  },
  image: {
    height: 150,
    width: 150,
  },
  imageUpload: {
    display: "none",
  },
  name: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2vw",
  },
  labelField: {
    marginTop: theme.spacing(3),
  },
  saveBtn: {
    marginTop: "32px",
    textAlign: "center"
  },
  imageHidden: {
    display: "none",
    padding: "16px 24px",
  },
  imageDisplayed: {
    padding: "16px 0",
  }
}));


function DialogTitle(props) {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

function ChangeImageDialog(props) {
  const classes = useStyles();
  const { onClose, open, imageChange, handleChange, saveChanges } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog data-testid = "ChangeImageDialogTest" onClose={handleClose} open={open} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="xs">
      <DialogTitle onClose={handleClose}>Choose a Image</DialogTitle>
      <form onSubmit={saveChanges} className={classes.changePswForm}>
        <Grid>
          <Button onClick={() => { imageChange(burgerdefault); handleClose() }}>
            <img className={classes.image} src={burgerdefault} alt="profile image" />
          </Button>
          <Button onClick={() => { imageChange(burger); handleClose() }}>
            <img className={classes.image} src={burger} alt="profile image" />
          </Button>
          <Button onClick={() => { imageChange(fries); handleClose() }}>
            <img className={classes.image} src={fries} alt="profile image" />
          </Button>
          <Button onClick={() => { imageChange(doublepatty); handleClose() }}>
            <img className={classes.image} src={doublepatty} alt="profile image" />
          </Button>
        </Grid>
      </form>
    </Dialog>
  );
}

function UploadImage(props) {
  const classes = useStyles();
  // TODO: I dont know what these are for
  // There were declared before this component was pulled from being hardcoded in a page
  // Just propping them in for now.
  const { imagesrc, editState } = props;

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      {/*Accepting only files with image type*/}
      {/* <input type="file" id="input" accept="image/*" onChange={imagesrc} ref={imagesrc} className={classes.imageUpload} /> */}
      <div data-testid = "UploadImageTest" className={classes.profileImg}>
        <img className={classes.image} src={imagesrc} alt="placeholder image" />
      </div>
      <div className={editState ? classes.imageHidden : classes.imageDisplayed}>
        <Button onClick={handleDialogOpen} variant="outlined" color="secondary">Upload Image</Button>
        <ChangeImageDialog open={open} onClose={handleClose} {...props}></ChangeImageDialog>
      </div>
    </div>
  )
}



export default function PlaceholderImage(props) {
  const classes = useStyles();

  return (
    <div maxWidth="md">
      <div className={classes.container}>
        <UploadImage {...props} />
      </div>
    </div>
  )
}