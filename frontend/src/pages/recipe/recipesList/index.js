import React, { useState, useEffect, useContext } from "react";
import Recipes from "../../../components/recipesList/index.js";

import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

export default function RecipesList() {
    const { authState } = useContext(AuthContext);
    const [recipesState, setRecipesState] = useState(undefined);

    const fetchData = async () => {
      const res = await api.recipe.getAll(authState.token);
      setRecipesState(res.data);
      console.log(res.data);
    };
  
    useEffect(() => {
      if (recipesState === undefined) {
        fetchData();
      }
    });

    return(
      <Recipes recipesState = {recipesState}/>
    );

}