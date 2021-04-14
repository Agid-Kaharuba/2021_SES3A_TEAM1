import React, {useState} from "react";
import {Button, TextField, Container, Typography, Avatar} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },

  textField: {
    marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
  }
}));

export default function EmployeeProfile() {

    const classes = useStyles(); 

    const [employee, setEmployeeDetails] = useState({
        fName: "",
        lName: "",
        email: "",
        password:"",
        staffID:""
      });

    // const pImage = useState({
    //   profileImg:'https://cdn3.iconfinder.com/data/icons/gradient-general-pack/512/user-01-512.png'
    // });

    // const {profileImg} = this.pImage;

    function handleChange(e) {
        console.log(e.target);
         const{name,value} = e.target;

         setEmployeeDetails(prevValue => {
             if(name==="fName"){
                 return {
                    fName: value,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    password: prevValue.password,
                    staffID: prevValue.staffID
                 };
             } else if (name==="lName"){
                 return {
                     fName: prevValue.fName,
                     lName: value,
                     email: prevValue.email,
                     password: prevValue.password,
                     staffID: prevValue.staffID
                 };
             } else if (name==="email"){
                 return {
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: value,
                    password: prevValue.password,
                    staffID: prevValue.staffID
                 };
                } else if (name==="password"){
                  return {
                     fName: prevValue.fName,
                     lName: prevValue.lName,
                     email: prevValue.email,
                     password: value,
                     staffID: prevValue.staffID
                  };
             } else if (name==="staffID"){
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

    // const imageHandler = (e) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if(reader.readyState ===2) {
    //       this.setState({profileImg: reader.result})
    //     }
    //   }
    //   reader.readAsDataURL(e.target.files[0])
    // }

    return (
      <Container maxWidth="sm">
        
       <Typography variant="h4">Profile</Typography>
        {/* <Avatar alt="dora" src="./profile/pics/omg.jpg" />
        <img src={Pic1}/> */}
        {/* <div className="img-holder">
          <img src={profileImg} alt="user-icon" id="img" className="img"/>
        </div> */}
        {/*Accepting only files with image type*/}
        <input type = "file" name="image-upload" id="input" accept="image/*"/>  
        {/* <div className = "label">
           <label htmlFor="input" className="image-upload">
            
            </label> {/*a label for the input element above
        </div> */}
        <Typography variant="subtitle1">First Name</Typography>
        <TextField
          id="outlined-required"
          name = "fName"
          onChange={handleChange}
          value={employee.fName}
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <br/>
        <Typography variant="subtitle1">Last Name</Typography>
        <TextField
          id="outlined-required"
          name = "lName"
          onChange={handleChange}
          value={employee.lName}
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <br/>
        <Typography variant="subtitle1">Email</Typography>
        <TextField
          id="outlined-required"
          name = "email"
          onChange={handleChange}
          value={employee.email}
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <br/>
        <Typography variant="subtitle1">Password</Typography>
        <TextField
          id="outlined-password-input"
          type="password"
          name = "password"
          autoComplete="current-password"
          onChange={handleChange}
          value={employee.password}
          variant="outlined"
          fullWidth
          className={classes.password}
        />
        <br/>
        <Typography variant="subtitle1">Staff ID</Typography>
        <TextField
          id="outlined-required"
          name = "staffID"
          onChange={handleChange}
          value={employee.staffID}
          variant="outlined"
          fullWidth
          className={classes.textField}
        />
        <br/>
        <Button onClick= {saveChanges} variant="contained" color="secondary" className={classes.button}>
          Save
        </Button>
      </Container>
    );
}