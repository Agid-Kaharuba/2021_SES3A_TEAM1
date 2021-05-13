import React from 'react';
import { Button, Typography, Box, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link} from "react-router-dom";

const useStyles = makeStyles({
    bold: {
      fontWeight: 600
    },
    underline: {
      textDecoration: 'none'
    },
    italic: {
      fontStyle: 'italic'
    },
    table: {
      minWidth: 650,
    },
  })


export default function Recipes({recipesState}){
    const classes = useStyles();

    function buildRecipe(recipe) {
        return (
          <TableRow key={recipe.name}>
              <TableCell align="left">{recipe.name}</TableCell>
              <TableCell align="left">{recipe.category}</TableCell>
              <TableCell align="left">
              <Link className={classes.underline} to={`/recipe/${recipe._id}`}>
                  <Button variant="outlined" color="secondary">View Recipe</Button>
              </Link>
              </TableCell>
          </TableRow>
        )
        }

    return(
        <>
         <Box m={5}>
             <Grid container spacing={2} justify="space-between">
                <Grid item>
                    <Typography className={classes.bold} variant='h4'>
                    Recipes
                    </Typography>
                </Grid>
                <Grid item align="right">
                    <Button  variant="contained" color="primary" component={Link} to={"/recipeslist/createRecipe"}>Create Recipe</Button>
                </Grid>
              </Grid>
            <Divider variant="middle" />
          </Box>
    
          <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} align="left">Name</TableCell>
                            <TableCell className={classes.bold} align="left">Category</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipesState && recipesState.map((recipe) => {
                            return buildRecipe(recipe);
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
        </>
        );
}