import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecorationLine: 'underline'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650,
  },
})



export default function CreateNewTaskPage() {
  const classes = useStyles();
  // const [formState, setFormState] = useState({name: "", description: ""});
  // const { authState, setAuthState } = React.useContext(AuthContext);
  // let history = useHistory();

  // const handleChange = async (event) => {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setFormState({
  //     ...formState, [name]: value,
  //   });
  // }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);
  //   api.course.create(authState.token, formState);
  //   history.push('/createnewtask');
  // }

  return (
    <div>
      <Box m={5}>
        <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='baseline'>
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Create New Task
            </Typography>
          </Grid>
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>        
      </Box>

      <Box m={5}>
        <Box my={2}>
          <Typography variant='h5'>
            Task Details
          </Typography>
        </Box>

        <Box my={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Task's Name"
            fullWidth='true'
            variant="filled"
            name="name"
            // onChange={handleChange}
          />
        </Box>
        <Box my={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Task's Description"
            multiline
            rows={4}
            fullWidth='true'
            variant="filled"
            name="description"
            // onChange={handleChange}
          />
        </Box>
        <Box my={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Task's Duration"
            multiline
            rows={4}
            fullWidth='true'
            variant="filled"
            name="description"
            // onChange={handleChange}
          />
        </Box>
      </Box>


      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/dashboard/create">
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" component={Link} to="/dashboard/create"
          // onClick={handleSubmit} 
          >
            Save
          </Button>
        </Box>
      </Box>
    </div>
  )
}