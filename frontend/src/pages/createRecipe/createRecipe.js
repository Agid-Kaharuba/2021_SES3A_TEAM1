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

export default function CreateNewRecipePage() {
  const classes = useStyles();

  const [formState, setFormState] = useState({category: "", name: "", steps: "", ingredients: ""});

  const { authState, setAuthState } = React.useContext(AuthContext);
  let history = useHistory();

  const handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(name);

    setFormState({
      ...formState, [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    const test = new Array(formState.steps);
    setFormState({
      ...formState, steps: test, ingredients: [formState.ingredients], 
    })
    event.preventDefault();
    console.log(formState);
    api.recipe.create(authState.token, formState);
    history.push('/recipeslist');
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
              Create New Recipe
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
                Please enter the steps of your recipe below.
              </Typography>
            </Box>
            <Box my={2}>
            
                <Typography className={classes.bold} variant='h6'>
                  Category
                </Typography>
              <TextField
                id="outlined-multiline-static"
    
                fullWidth='true'
                variant="outlined"
                name="category"
                onChange={handleChange}
              />
            </Box>
            <Box my={2}>
            
                <Typography className={classes.bold} variant='h6'>
                  Recipe Name
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
                Ingredients
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth='true'
                variant="outlined"
                name="ingredients"
                onChange={handleChange}
              />
            </Box>

            <Box my={2}>
              <Typography className={classes.bold} variant='h6'>
                Steps
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                fullWidth='true'
                variant="outlined"
                name="steps"
                onChange={handleChange}
              />
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>

    </div>
  )
}