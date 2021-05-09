import React, { useState} from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Grid, FormControl, Select, MenuItem, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

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
  formControl: {
    margin: 2,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 2,
  },
})

export default function CreateNewTaskPage() {
  const classes = useStyles();

  const [formState, setFormState] = useState({name: "", description: "", recipe: ""});
  const { authState, setAuthState } = React.useContext(AuthContext);
  let history = useHistory();

  const handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState, [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    api.task.create(authState.token, formState);
    history.push('/dashboard/create-course');
  }

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
        <Paper style={{backgroundColor: "white"}} elevation={3}>
          <Box m={5} p={2}>
            <Box my={2} pb={2} fontStyle="italic">
              <Typography variant='h6'>
                Please enter the details of your desired task below.
              </Typography>
            </Box>

            <Box my={2}>
                <Typography className={classes.bold} variant='h6'>
                  Task Name
                </Typography>
              <TextField
                id="outlined-multiline-static"
    
                fullWidth='true'
                variant="outlined"
                name="name"
                onChange={handleChange}
              />
            </Box>

            <Box my={2}>
              <Typography className={classes.bold} variant='h6'>
                Task Description
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth='true'
                variant="outlined"
                name="description"
                onChange={handleChange}
              />
            </Box>

            <Box my={2}>
              <FormControl className={classes.formControl}>
              <Typography className={classes.bold} variant='h6'>
                  Task Type
              </Typography>
              <Select
                id="demo-simple-select-placeholder-label"
                onChange={handleChange}
                displayEmpty
                name="recipe"
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Practice"}>Practice</MenuItem>
                <MenuItem value={"Testing"}>Testing</MenuItem>
                <MenuItem value={"Performance"}>Performance</MenuItem>
              </Select>
            </FormControl>
            </Box>
            
          </Box>
        </Paper>
      </Box>

      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/dashboard/create-course">
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary"onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>

      
    </div>
  )
}