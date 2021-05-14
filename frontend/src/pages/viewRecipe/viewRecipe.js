import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Typography, Divider, Box, FormControl, Select, MenuItem, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import ViewRecipeSup from "../../components/viewRecipes/viewRecipesSup";
import ViewRecipeEmp from "../../components/viewRecipes/viewRecipesEmp";

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


export default function ViewRecipe(props) {
    const recipeId = props.match.params.recipeId;
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    const [recipeState, setRecipeState] = useState(undefined);
    const [editState, setEditState] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setRecipeState({ ...recipeState, [id]: value })
    }

    const handleEdit = async (e) => {
        //Set editState to enable if user is an employee
        //Update if button is selected
        if (!editState) {
            console.log(recipeState)
            const res = await api.recipe.update(authState.token, recipeId, recipeState);
        }
        setEditState(!editState);
    }

    const fetchData = async () => {
        const res = await api.recipe.get(authState.token, recipeId);
        console.log(res.data);
        setRecipeState(res.data);
    };

    useEffect(() => {
        if (recipeState === undefined) {
            fetchData();
        }
    });
    if (recipeState === undefined) {
        // TODO: add loader
        return (<h1>LOADING</h1>)
    }
    else {
        if(authState.user.isSupervisor){
        return(
            <ViewRecipeSup 
            handleEdit = {handleEdit}
            editState = {editState} 
            recipeState = {recipeState}  
            handleChange = {handleChange}>
            </ViewRecipeSup>
        );
        }
        else{
            return(
                <ViewRecipeEmp recipeState = {recipeState}/>
            )
        }
    }
}