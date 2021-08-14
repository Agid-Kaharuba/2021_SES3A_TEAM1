import React from "react";
import { Button, TextField, Container, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../backbutton";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
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
    height: 200,
    width: 200,
    borderRadius: 100,
    margin: theme.spacing(2),
  },
  uploadBtn: {
    position: "absolute",
    bottom: "0px",
    right: "0px"
  },
  imageUpload: {
    display: "none",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    columnGap: "2vw"
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
    textAlign: "center"
  }
}));

function ProfilePicture(props) {
  const classes = useStyles();
  // TODO: I dont know what these are for
  // There were declared before this component was pulled from being hardcoded in a page
  // Just propping them in for now.
  const { imageUploader, handleImageUpload } = props;

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
      <input type="file" id="input" accept="image/*" onChange={handleImageUpload} ref={imageUploader} className={classes.imageUpload} />
      <div className={classes.profileImg}>
        <img className={classes.image} src={props.image.data} alt="profile image" />
        <IconButton onClick={() => imageUploader.current.click()} className={classes.uploadBtn}><EditIcon fontSize="large" /></IconButton>
      </div>
      <div>
        <Button onClick={handleDialogOpen} variant="outlined" color="secondary" className={classes.changePsw}>Change Password</Button>
      </div>
    </div>
  )
}

export default function Profile(props) {
  const classes = useStyles();
  const { employee, handleChange, saveChanges } = props;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={classes.heading}>My Profile</Typography>
      <div className={classes.container}>
        <ProfilePicture {...props} />
        <form onSubmit={saveChanges}>
          <div className={classes.name}>
            <div className={classes.labelField}>
              <Typography variant="subtitle1" className={classes.typography}>First Name</Typography>
              <TextField
                id="outlined-required"
                name="firstname"
                onChange={handleChange}
                value={employee.firstname}
                variant="outlined"
                fullWidth
                className={classes.textField}
              // label="First Name"
              />
            </div>
            <div className={classes.labelField}>
              <Typography variant="subtitle1" className={classes.typography}>Last Name</Typography>
              <TextField
                id="outlined-required"
                name="lastname"
                onChange={handleChange}
                value={employee.lastname}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
            </div>
          </div>
          <div className={classes.labelField}>
            <Typography variant="subtitle1" className={classes.typography}>Staff ID</Typography>
            <TextField
              id="outlined-required"
              name="staffid"
              onChange={handleChange}
              value={employee.staffid}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </div>
          <div className={classes.labelField}>
            <Typography variant="subtitle1" className={classes.typography}>Email</Typography>
            <TextField
              id="outlined-required"
              name="email"
              onChange={handleChange}
              value={employee.email}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </div>
        </form>
      </div>
      <div className={classes.saveBtn}>
        <Button variant="contained" color="secondary" className={classes.button} type="submit">
          Save
        </Button>
      </div>
    </Container>
  )
}