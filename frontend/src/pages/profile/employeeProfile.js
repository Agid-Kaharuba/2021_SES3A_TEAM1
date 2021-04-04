import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";

// test

export default function EmployeeProfile() {

    const [employee, setEmployeeDetails] = useState({
        fName: "",
        lName: "",
        email: "",
        staffID:""
      });

    function handleChange(e) {
        console.log(e.target);
         const{name,value} = e.target;

         setEmployeeDetails(prevValue => {
             if(name==="fName"){
                 return {
                    fName: value,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    staffID: prevValue.staffID
                 };
             } else if (name==="lName"){
                 return {
                     fName: prevValue.fName,
                     lName: value,
                     email: prevValue.email,
                     staffID: prevValue.staffID
                 };
             } else if (name==="email"){
                 return {
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: value,
                    staffID: prevValue.staffID
                 };
             } else if (name==="staffID"){
                 return {
                    fName: prevValue.fName,
                    lName: prevValue.lName,
                    email: prevValue.email,
                    staffID: value
                 };
             }
         });
    }

    return (
        <div>
        {/* <Button variant='contained' color='primary'>Hello!</Button> */}

       {/* do text field first */}
       {/* you will need a save button so that the values get stored in the database and can be used next time */}

        <TextField
          id="outlined-required"
          label="First Name"
          name = "fName"
          onChange={handleChange}
          value={employee.fName}
          variant="outlined"
        />
        <TextField
          id="outlined-required"
          label="Last Name"
          name = "lName"
          onChange={handleChange}
          value={employee.lName}
          variant="outlined"
        />
        <TextField
          id="outlined-required"
          label="Email"
          name = "email"
          onChange={handleChange}
          value={employee.email}
          variant="outlined"
        />
        <TextField
          id="outlined-required"
          label="Staff ID"
          name = "staffID"
          onChange={handleChange}
          value={employee.staffID}
          variant="outlined"
        />
        </div>
    );
}