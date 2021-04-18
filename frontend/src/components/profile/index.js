import React from "react";
import { Button, TextField, Container, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    margin: theme.spacing(1),
  },
  imageUpload: {
    display: "none",
    // marginBottom: theme.spacing(0.1)
  },
  container: {
    alignItems: "center",
    display: 'flex',
    flexDirection: 'column',
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const { employee, handleChange, handleImageUpload, saveChanges } = props;

  // TODO: I dont know what these are for
  // There were declared before this component was pulled from being hardcoded in a page
  // Just propping them in for now.
  const { uploadedImage, imageUploader } = props;

  return (
    <Container maxWidth="sm">
      <div className={classes.container}>
        <Typography variant="h4" className={classes.heading}>PROFILE</Typography>

        {/*Accepting only files with image type*/}
        <input type="file" id="input" accept="image/*" onChange={handleImageUpload} ref={imageUploader} className={classes.imageUpload} />
        <div>
          <img className={classes.image} ref={uploadedImage} />
          <br />
          <Button size="small" onClick={() => imageUploader.current.click()} variant="outlined" color="secondary">Upload Image</Button>
        </div>
      </div>

      <br />
      <Typography variant="subtitle1" className={classes.typography}>First Name</Typography>
      <TextField
        id="outlined-required"
        name="fName"
        onChange={handleChange}
        value={employee.firstname}
        variant="outlined"
        fullWidth
        className={classes.textField}
      // label="First Name"
      />
      <br />
      <Typography variant="subtitle1" className={classes.typography}>Last Name</Typography>
      <TextField
        id="outlined-required"
        name="lName"
        onChange={handleChange}
        value={employee.lastname}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <br />
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
      <br />
      <Typography variant="subtitle1" className={classes.typography}>Password</Typography>
      <TextField
        id="outlined-password-input"
        type="password"
        name="password"
        autoComplete="current-password"
        onChange={handleChange}
        value={employee.password}
        variant="outlined"
        fullWidth
        className={classes.password}
      />
      <br />
      <Typography variant="subtitle1" className={classes.typography}>Staff ID</Typography>
      <TextField
        id="outlined-required"
        name="staffID"
        onChange={handleChange}
        value={employee.staffid}
        variant="outlined"
        fullWidth
        className={classes.textField}
      />
      <br />
      <div className={classes.container}>
        <Button onClick={saveChanges} variant="contained" color="secondary" className={classes.button}>
          Save
        </Button>
      </div>
    </Container>
  )
}