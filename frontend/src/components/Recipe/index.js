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
            <select name="category" id="category" onChange={handleChange} value={recipeState.category} disabled={!editState} style={{ width: '100%', height: '4vw', fontSize: '1.2vw' }}>
              <option> </option>
              <option value="Burger">Burger</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
            </select>
          </Grid>

          <RecipeBuilder edit={editState} ingredients={recipeState.ingredients} onChange={onChangeIngredients} />

        </Grid>
      </Box>
    </>
  );
}

//PLEASE DON'T TOUCH BELOW CODE THANKS, for me to work on tmr
//from: frontend>components>Task>index.js , to standardise drop down list for whole web app

{/* <Box my={2}>
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
</Box> */}