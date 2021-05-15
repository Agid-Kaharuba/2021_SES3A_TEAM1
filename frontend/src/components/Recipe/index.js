import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { Button, Typography, Box, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipeBuilder from "./recipeBuilder";

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
  formControl: {
    minWidth: 200,
  },
})

export default function Recipe(props) {
  let history = useHistory();
  const { handleChange, editState, recipeState } = props;

  const onChangeIngredients = (ingredients) => {
    handleChange && handleChange({ target: { name: "ingredients", id: "ingredients", value: ingredients } });
  }

  const classes = useStyles();
  return (
    <>
      <Box m={5}>
        <Grid container spacing={2} direction="column" justify="space-between">
          <Grid>
            <Typography className={classes.bold} variant='h6'>
              Name
            </Typography>
            <TextField value={recipeState.name} id="name" name="name" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
          </Grid>
          <Grid>
            <Typography className={classes.bold} variant='h6'>
              Category
            </Typography>
            <TextField value={recipeState.category} id="category" name="category" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
          </Grid>
          <Grid>
            <Typography className={classes.bold} variant='h6'>
              Ingredients
            </Typography>
            <Box my={2}>
              <Paper elevation={3}>
                <RecipeBuilder edit={editState} ingredients={recipeState.ingredients} onChange={onChangeIngredients} />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}