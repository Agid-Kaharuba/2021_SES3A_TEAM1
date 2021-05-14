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

export default function RecipeBuilder(props) {
  const [state, setState] = useState([
    { id: "top-bun", value: "Top Bun", src: "https://www.metro.ca/userfiles/image/infographics/images/burgers/5-COWBOY/5-Cowboy-Bun-Top.png" },
    { id: "patty", value: "Patty", src: "https://image.shutterstock.com/image-photo/single-grilled-hamburger-patty-isolated-260nw-534672568.jpg" },
    { id: "bottom-bun", value: "Bottom Bun", src: "https://png.pngitem.com/pimgs/s/344-3449103_bun-bread-bottom-hd-png-download.png" }
  ]);

  const onDragEnd = (result) => {
    var newOrder = reorder(state, result.source.index, result.destination.index)
    setState(newOrder);
  }

  const TaskList = () => {
    return
  }

  return (
    state && (
      <Box mx={20}>
        <Paper style={{ backgroundColor: "white" }} elevation={3}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="recipe">
              {provided => (
                <Grid
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  {state.map((ingredient, index) => <Ingredient ingredient={ingredient} index={index} />)}
                  {provided.placeholder}
                </Grid >
              )}
            </Droppable>
          </DragDropContext>
        </Paper>
      </Box>
    )
  );
}