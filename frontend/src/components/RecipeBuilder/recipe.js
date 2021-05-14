import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Typography, Divider, Box, FormControl, Select, MenuItem, Grid, TextField, Container } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

import Ingredient from "./ingredient"

export default function Recipe(props) {
  return (
    <Container>
      <Droppable droppableId="droppable">
        {provided => (
          <Grid
            {...provided.droppableProps}
            ref={provided.innerRef}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            {props.items.map((x, index) => <Ingredient id={x} index={index} />)}
            {provided.placeholder}
          </Grid >
        )}
      </Droppable>
    </Container>
  );
}