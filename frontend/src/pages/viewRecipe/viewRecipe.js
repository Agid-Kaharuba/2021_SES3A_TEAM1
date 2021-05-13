import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Divider, Box, FormControl, Select, MenuItem, Grid, TextField } from "@material-ui/core";
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
        return (
            <>
            <Box m={5}>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Typography className={classes.bold} variant='h4'>
                            Recipe
                   </Typography>
                    </Grid>
                    <Grid item align="right">
                        <Button variant="contained" style={{ width: 80 }} color={editState ? "secondary" : "primary"} size="large" onClick={handleEdit}>
                            {editState ? "Edit" : "Save"}
                        </Button>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
            </Box>
            <Box m={5}>

                <Grid container spacing={2} direction="column" justify="space-between">
                    <Grid>
                        <Typography className={classes.bold} variant='h6'>
                            Name
            </Typography>
                        <TextField value={recipeState.name} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Typography className={classes.bold} variant='h6'>
                            Category
            </Typography>
                        <TextField value={recipeState.category} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Typography className={classes.bold} variant='h6'>
                            Ingredients
            </Typography>
                        <TextField value={recipeState.ingredients} id="ingredients" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Typography className={classes.bold} variant='h6'>
                            Steps
            </Typography>
                        <TextField value={recipeState.steps} id="steps" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        margin="normal">
                    </Grid>

                </Grid>
            </Box>
        </>
        )
    }
}