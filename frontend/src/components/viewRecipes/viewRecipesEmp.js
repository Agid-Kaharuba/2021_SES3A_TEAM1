import React from 'react';
import { Button, Typography, Box, Divider, TextField, Text, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link} from "react-router-dom";

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

export default function ViewRecipeSup(props){
    const {recipeState} = props;
    const classes = useStyles();
    return(
        <>
        <Box m={5}>
            <Grid container spacing={2} justify="space-between">
                <Grid item>
                    <Typography className={classes.bold} variant='h4'>
                        Recipe
               </Typography>
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
                    <TextField value={recipeState.name} id="name" variant="outlined" fullWidth margin='normal' />
                </Grid>
                <Grid>
                    <Typography className={classes.bold} variant='h6'>
                        Category
        </Typography>
                    <TextField value={recipeState.category} id="category" disabled={false} variant="outlined" fullWidth margin='normal' />
                </Grid>
                <Grid>
                    <Typography className={classes.bold} variant='h6'>
                        Ingredients
        </Typography>
                    <TextField value={recipeState.ingredients} id="ingredients" disabled={false} variant="outlined" fullWidth margin='normal' multiline rows={10} />
                </Grid>
                <Grid>
                    <Typography className={classes.bold} variant='h6'>
                        Steps
        </Typography>
                    <TextField value={recipeState.steps} id="steps" disabled={false} variant="outlined" fullWidth margin='normal' multiline rows={10} />
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
    );
}