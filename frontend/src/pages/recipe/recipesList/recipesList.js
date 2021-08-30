import React, { useState, useEffect, useContext } from "react";
import Recipes from "../../../components/Recipe/list.js";
import { Button, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, Card, CardContent, CardActions, CardActionArea, CardMedia, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

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

export default function RecipesList() {
  const classes = useStyles();
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
  const testMethod = () => {
    return(
      <div className = {classes.recipes}>
       {recipesState.map((recipe) => {
         return buildRecipe(recipe);
       })}
       
       {authState.user.isSupervisor && (
         <Grid item xs={12} sm={6} md={3}>
         <Card className={classes.root} variant="outlined" style={{ textDecoration: 'none' }} component={Link} to={"/task/create"}>
           <CardActionArea>
           <CardMedia 
           className={classes.media}
           //these images are just placeholders for now
           image="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png"
           title="Fast Food Training"
           />
           <CardContent>
             <Typography align="center" gutterBottom variant="h6" component="h2">
             Create New Recipe
           </Typography>
           </CardContent>
           </CardActionArea>
         </Card>
         </Grid>
       )}
   </div>
    )
 }
  const buildRecipe = (recipe) => {
    return (
      <Box mx={5} my={2}>
        <Paper>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {recipe.name} - {recipe.description}
              </Typography>

            </CardContent>
            <CardActions>
              <Link className={classes.underline} to={`/dashboard/${recipe._id}`}>
                <Button size="small">View Task</Button>
              </Link>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    )
  }
  return (
    <Box>

<Box m={5}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='baseline'>
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Dashboard
            </Typography>
          </Grid>
          {/* <Grid item>
            {authState.user.isSupervisor && (
              <Button component={Link} color="primary" variant="contained" to={"/dashboard/create"}>
                Create Training
              </Button>)}
          </Grid> */}
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>
      </Box>

      <Box m={5}>
        {recipesState ?
          testMethod()
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )

}