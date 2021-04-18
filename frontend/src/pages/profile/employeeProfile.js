import React, { useState } from "react";
import { Button, TextField, Container, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import UploadImageForm from "../../components/upload";

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

export default function EmployeeProfile(props) {

  let userData = [props.ProfileState]
  const classes = useStyles();

  const [employee, setEmployeeDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    staffID: ""
  });

  const pImage = useState({
    profileImg:'https://cdn3.iconfinder.com/data/icons/gradient-general-pack/512/user-01-512.png'
  });

  // const {profileImg} = this.pImage;

  function handleChange(e) {
    console.log(e.target);
    const { name, value } = e.target;

    setEmployeeDetails(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email,
          password: prevValue.password,
          staffID: prevValue.staffID
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email,
          password: prevValue.password,
          staffID: prevValue.staffID
        };
      } else if (name === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value,
          password: prevValue.password,
          staffID: prevValue.staffID
        };
      } else if (name === "password") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: prevValue.email,
          password: value,
          staffID: prevValue.staffID
        };
      } else if (name === "staffID") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: prevValue.email,
          password: prevValue.password,
          staffID: value
        };
      }
    });
  }

  function saveChanges() {

  }

  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  };

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
        value={employee.fName}
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
        value={employee.lName}
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
        value={employee.staffID}
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
  );
}