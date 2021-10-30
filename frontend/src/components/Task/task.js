import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import {
  Box, Button, Typography, Divider, TextField, Grid, FormControl, Select, MenuItem, Paper,
  ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import RecipeSelector from "../Recipe/selector";

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

export default function Task(props) {
  const { handleChange, editState, taskState, handleRecipe } = props;
  const { authState, setAuthState } = React.useContext(AuthContext);
  const classes = useStyles();

  let history = useHistory();

  return (
    <div data-testid = "TasksTest">

      <Box my={2}>
        <Typography className={classes.bold} variant='h6'>
          Task Name
        </Typography>
        <TextField
          id="name"
          fullWidth='true'
          variant="outlined"
          name="name"
          disabled={!editState}
          value={taskState.name}
          onChange={handleChange}
        />
      </Box>

      <Box my={2}>
        <Typography className={classes.bold} variant='h6'>
          Task Description
        </Typography>
        <TextField
          id="description"
          multiline
          rows={4}
          fullWidth='true'
          variant="outlined"
          name="description"
          disabled={!editState}
          value={taskState.description}
          onChange={handleChange}
        />
      </Box>

      <Box my={2}>
        <FormControl disabled={!editState} className={classes.formControl}>
          <Typography className={classes.bold} variant='h6'>
            Task Type
          </Typography>
          <Select
            id="demo-simple-select-placeholder-label"
            onChange={handleChange}
            displayEmpty
            name="type"
            className={classes.selectEmpty}
            value={taskState.type}
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


      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.bold} variant='h6'>
            Recipe
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ "flex-direction": "column" }}>
          <RecipeSelector recipeState={taskState.recipe} editState={editState} handleRecipe={handleRecipe} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}