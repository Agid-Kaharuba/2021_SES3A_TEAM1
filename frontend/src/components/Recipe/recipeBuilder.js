import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import {
  Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, Card,
  CardContent, CardActions, Paper, Grid, makeStyles
} from "@material-ui/core";

import Ingredient from "./ingredient"

import TopBun from '../../images/recipe/recipe-topBun.png';
import BottomBun from '../../images/recipe/recipe-bottomBun.png';
import Patty from '../../images/recipe/recipe-patty.png';
import Lettuce from '../../images/recipe/recipe-lettuce.png';
import Cheese from '../../images/recipe/recipe-cheese.png';
import Sauce from '../../images/recipe/recipe-sauce.png';
import Tomato from '../../images/recipe/recipe-tomato.png';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const insertIntoArray = (list, value, index) => {
  list.splice(list, index, value);
};

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  ingGrid: {
    display: "grid",
    gridTemplateColumns: 'repeat( auto-fit, minmax(200px, 1fr) )',
    gap: "10px"
  }
})


export default function RecipeBuilder(props) {
  const ingredients = [
    { id: "top_bun", value: "Top Bun", src: TopBun, rSrc: TopBun },
    { id: "bottom_bun", value: "Bottom Bun", src: BottomBun, rSrc: BottomBun },
    { id: "patty", value: "Patty", src: "https://image.shutterstock.com/image-photo/single-grilled-hamburger-patty-isolated-260nw-534672568.jpg", rSrc: Patty },
    { id: "lettuce", value: "Lettuce", src: "https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg", rSrc: Lettuce },
    { id: "cheese", value: "Cheese", src: "https://qph.fs.quoracdn.net/main-qimg-fa4e8f9efa8f3ca480f03b93bb3e9b58", rSrc: Cheese },
    { id: "sauce", value: "Tomato Sauce", src: "https://pngimg.com/uploads/sauce/sauce_PNG72.png", rSrc: Sauce },
    { id: "tomato", value: "Tomato", src: "https://s3.envato.com/files/250360646/DSC_0674.jpg", rSrc: Tomato }
  ];

  const [state, setState] = useState([]);
  const [itemCount, setItemCount] = useState(props.ingredients ? props.ingredients.length + 1 : 1);

  useEffect(() => {
    var counter = 0;
    props.ingredients.forEach((x, inde) => {
      var ingredient = ingredients.find(y => x == y.id);
      ingredient = { ...ingredient, id: `${ingredient.id}-${inde}`, unity_id: ingredient.id };
      state.push(ingredient);
    });
    setState(state);
    setItemCount(state.length);
  }, []);

  const onSetState = (state) => {
    if (props.onChange) {
      props.onChange(state.map(x => x.unity_id));
    }
    setState(state);
  }

  const onDragEnd = (result) => {
    if (!result.destination) { //throw item from ingredients
      if (result.source.droppableId == "recipe") {
        state.splice(result.source.index, 1);
        onSetState(state);
        state.map(x => x.unity_id)
      }
      return;
    }

    if (result.source.droppableId == "ingredients" && result.destination.droppableId == "recipe") {
      const ingr = { ...ingredients[result.source.index] };
      setItemCount(itemCount + 1);
      ingr.unity_id = ingr.id
      const someRandomNum = Math.floor(Math.random() * 69420);
      ingr.id = `${ingr.id}-${itemCount}-${someRandomNum}`
      state.splice(result.destination.index, 0, ingr);
      onSetState(state);
    }
    else if (result.source.droppableId == "recipe" && result.destination.droppableId == "recipe") {
      var newOrder = reorder(state, result.source.index, result.destination.index)
      onSetState(newOrder);
    }
  }

  const classes = useStyles();

  return (
    state && (
      <DragDropContext data-testid="RecipeBuilderTest" onDragEnd={onDragEnd}>

        {/* ingredients list to choose from*/}
        <Grid item style={{ gridRow: 2 }}>
          {(props.edit == undefined || props.edit) &&
            <Droppable droppableId="ingredients" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div>
                  <Typography className={classes.bold} variant='h6'>
                    Ingredients
                  </Typography>
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={classes.ingGrid}
                    container
                  >
                    {ingredients.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          }
        </Grid>

        {/* Recipe ingredients selected */}
        <Grid item style={{ gridRow: "1/4" }}>
          <Typography variant='h4' align="center">
            Recipe Ingredients
          </Typography>
          <div style={{ padding: 18 }}>
            <Droppable droppableId="recipe" draggable={false}>
              {(provided, snapshot) => (
                <Paper
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 15
                  }}
                  elevation={3}>
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                    container
                    //direction="column"
                    alignItems="center"
                    justify="center"
                  >
                    {state && state.length > 0
                      ? state.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} edit={props.edit} view={true} />)
                      : <Typography variant='h6' justify="center">
                        Drop ingredients here
                      </Typography>
                    }
                    {provided.placeholder}
                  </div>
                </Paper>
              )}
            </Droppable>
          </div>
        </Grid>

      </DragDropContext>
    )
  );
}