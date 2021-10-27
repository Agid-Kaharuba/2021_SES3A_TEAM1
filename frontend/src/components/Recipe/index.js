import React from 'react';
import { Link, useHistory } from "react-router-dom";
import {
  Button, Typography, Box, Divider, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Grid
} from "@material-ui/core";
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
    margin: 2,
    minWidth: 120,
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
        <Grid container spacing={2} direction="column" justify="space-between"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "3vw"
          }}>
          <Grid style={{ gridRow: "1" }}>
            <Typography className={classes.bold} variant='h6'>
              Name
            </Typography>
            <TextField value={recipeState.name} id="name" name="name" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
            <Typography className={classes.bold} variant='h6'>
              Category
            </Typography>
            {/* <TextField value={recipeState.category} id="category" name="category" disabled={!editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} /> */}
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={recipeState.category}
              disabled={!editState}
              style={{ width: '100%', height: '2.5em', fontSize: '1.2rem' }}
            >
              <option> </option>
              <option value="Burger">Burger</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
              <option value="Fried Food">Fried Food</option>
            </select>
          </Grid>

          <RecipeBuilder edit={editState} ingredients={recipeState.ingredients} onChange={onChangeIngredients} />

        </Grid>
      </Box>
    </>
  );
}



