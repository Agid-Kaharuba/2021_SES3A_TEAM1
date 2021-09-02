import React, { useEffect, useState, useContext } from 'react';
import Recipes from "./list"
import { Button, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import Recipe from "./";

export default function RecipeSelector(props) {
  const { editState, recipeState, handleRecipe } = props;
  const { authState } = useContext(AuthContext);
  const [recipesState, setRecipesState] = useState(undefined);
  const [createState, setCreateState] = useState(false);

  const fetchData = async () => {
    const res = await api.recipe.getAll(authState.token);
    setRecipesState(res.data);
  };

  useEffect(() => {
    if (recipesState === undefined) {
      fetchData();
    }
  });

  const onSetRecipe = (clear) => {
    console.log(recipeState)
    if (clear === true) {
      setCreateState(false);
      handleRecipe(undefined);
    }
    else {
      if (createState) {
        setCreateState(false);

      }
      else {
        handleRecipe({ category: "", name: "", ingredients: ["top_bun", "bottom_bun"] });
        setCreateState(true);

      }
    }
  }

  const setRecipeButton = (props) => {
    return (<Button variant="outlined" color="secondary" onClick={() => handleRecipe(props.recipe)}>Set Recipe</Button>)
  }

  const onChangeRecipe = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    handleRecipe({
      ...recipeState, [name]: value,
    });
  }

  if (recipeState) {
    return (
      <>
        <Recipe recipeState={recipeState} handleChange={onChangeRecipe} editState={recipeState._id === undefined} />
        {editState && (<Button variant="contained" color="primary" onClick={() => onSetRecipe(true)}>Set Another Recipe</Button>)}
      </>
    )
  }
  else if (createState) {
    return (
      <>
        <Recipe recipeState={recipeState} handleChange={onChangeRecipe} editState={editState} />
        {editState && (<Button variant="contained" color="primary" onClick={onSetRecipe}>Set Existing Recipe</Button>)}
      </>
    )

  }
  else {
    return (
      (editState ? (<>
        <Recipes recipesState={recipesState} ActionButton={(props) => (editState && setRecipeButton(props))} />
        <Button variant="contained" color="primary" onClick={onSetRecipe}>Create New Recipe</Button>
      </>) : (
        <h1>No recipe set</h1>
      )
      )
    )
  }
}