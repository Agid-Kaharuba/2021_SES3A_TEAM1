import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import {
  Box, Button, Typography, Divider, TextField, Grid, FormControl, Select, MenuItem, Paper,
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

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

  const [formState, setFormState] = useState({ name: "", description: "", type: "" });

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
    try {
      const res = await api.task.create(authState.token, formState);
      history.push(`/task/${res.data._id}`);
    }
    catch (err) {
      console.log(err);
    }
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
        <Paper style={{ backgroundColor: "white" }} elevation={3}>
          <Box m={5} p={2}>
            <Box my={2} pb={2} fontStyle="italic">
              <Typography variant='h6'>
                Please enter the details of your desired task below.
              </Typography>
            </Box>

            {/* <Task /> */}

          </Box>
        </Paper>
      </Box>

      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/dashboard/create">
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