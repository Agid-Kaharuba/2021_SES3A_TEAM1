import React, { useState, useEffect, useContext } from "react";
import Recipes from "../../../components/Recipe/list.js";
import {
  Button,
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    textDecoration: "none",
    height: 315,
  },
  bold: {
    fontWeight: 600,
  },
  underline: {
    textDecorationLine: "none",
  },
  italic: {
    fontStyle: "italic",
  },
  table: {
    minWidth: 650,
  },
  media: {
    height: 143,
    backgroundSize: "contain",
  },
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "50px",
  },
  trainingModules: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
  },
  trainingImage: {
    height: 143,
    backgroundSize: "contain",
    marginBottom: 45,
  },
  buttons: {
    marginLeft: 10,
  },
  text: {
    textAlign: "center",
  },
  actionArea: {
    height: 315,
  },
});

export default function RecipesList() {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [recipesState, setRecipesState] = useState(undefined);

  const fetchData = async () => {
    const res = await api.recipe.getAll(authState.token);
    setRecipesState(res.data);
    console.log(res.data);
  };

  const history = useHistory();

  const handleRecipe = (recipe) => {
    history.push(`/recipe/${recipe._id}`);
  };

  useEffect(() => {
    if (recipesState === undefined) {
      fetchData();
    }
  });

  const createRecipeModules = () => {
    return (
      <div className={classes.trainingModules}>
        {recipesState.map((recipe) => {
          return buildRecipe(recipe);
        })}
        {/* Line checks if the user is a supervisor and show create training button if they are. */}
        {authState.user.isSupervisor && (
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={3}>
              <Link to={"/recipe/create"} className={classes.underline}>
                <Card className={classes.root} variant="outlined">
                  <CardActionArea className={classes.actionArea}>
                    <CardMedia
                      className={classes.trainingImage}
                      //these images are just placeholders for now
                      image="https://icons.veryicon.com/png/o/miscellaneous/standard-general-linear-icon/plus-60.png"
                      title="Create New Training"
                    />
                    <CardContent className={classes.text}>
                      <Typography gutterBottom variant="h6" component="h2">
                        Create New Recipe
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          </Grid>
        )}
      </div>
    );
  };

  const buildRecipe = (recipe) => {
    return (
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            className={classes.root}
            variant="outlined"
            onClick={() => handleRecipe(recipe)}
          >
            <CardActionArea className={classes.actionArea}>
              <CardMedia
                className={classes.media}
                //these images are just placeholders for now
                image="https://i.pinimg.com/originals/8b/f0/76/8bf07692b7f9704f1b3552943bdcf1cd.jpg"
                title="Fast Food Training"
              />
              <CardContent className={classes.text}>
                <Typography gutterBottom variant="h6" component="h2">
                  {recipe.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {recipe.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      <Box m={5}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grid item>
            <Typography className={classes.bold} variant="h4">
              Recipes
            </Typography>
          </Grid>
          <Grid item>{authState.user.isSupervisor}</Grid>
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>
      </Box>

      <Box m={5}>{recipesState ? createRecipeModules() : <h1>LOADING</h1>}</Box>
    </Box>
  );
}
