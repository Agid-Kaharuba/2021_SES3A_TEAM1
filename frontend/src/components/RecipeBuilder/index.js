import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Box, FormControl, Select, MenuItem, TextField, Divider, Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Recipe from "./recipe"
import Ingredient from "./ingredient"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const insertIntoArray = (list, value, index) => {
  list.splice(list, index, value);
};

export default function RecipeBuilder(props) {
  const [state, setState] = useState([]);
  var itemCount = 0;

  const ingredients = [
    { id: "top-bun", value: "Top Bun", src: "https://www.metro.ca/userfiles/image/infographics/images/burgers/5-COWBOY/5-Cowboy-Bun-Top.png" },
    { id: "patty", value: "Patty", src: "https://image.shutterstock.com/image-photo/single-grilled-hamburger-patty-isolated-260nw-534672568.jpg" },
    { id: "bottom-bun", value: "Bottom Bun", src: "https://png.pngitem.com/pimgs/s/344-3449103_bun-bread-bottom-hd-png-download.png" }
  ];

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId == "ingredients" && result.destination.droppableId == "recipe") {
      const ingr = { ...ingredients[result.source.index] };
      ingr.id = "item-" + itemCount++
      state.splice(result.destination.index, 0, ingr);
      setState(state);
    }
    else if (result.source.droppableId == "recipe" && result.destination.droppableId == "recipe") {
      var newOrder = reorder(state, result.source.index, result.destination.index)
      setState(newOrder);
    }
    console.log(state);
  }

  const TaskList = () => {
    return
  }

  return (
    state && (
      <Box mx={50}>
        <Paper style={{ backgroundColor: "white" }} elevation={3}>
          <Grid container>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid item style={{ flex: 0.3 }}>
                <Droppable droppableId="ingredients">
                  {provided => (
                    <Grid
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      container
                      direction="column"
                      alignItems="center"
                      justify="center"
                    >
                      {ingredients.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)}
                      {provided.placeholder}
                    </Grid >
                  )}
                </Droppable>
              </Grid>

              <Grid item style={{ flex: 0.7 }}>
                <Droppable droppableId="recipe">
                  {(provided, snapshot) => (
                    <Paper>
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ "min-height": "70vh" }}
                        isDraggingOver={snapshot.isDraggingOver}
                        container
                        direction="column"
                        alignItems="center"
                      >
                        {state && state.length > 0
                          ? state.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)
                          : <Typography variant='h4'>
                              Drop ingredients here
                            </Typography>
                        }
                        {provided.placeholder}
                      </Grid>
                    </Paper>
                  )}
                </Droppable>
              </Grid>
            </DragDropContext>
          </Grid>
        </Paper>
      </Box >
    )
  );
}