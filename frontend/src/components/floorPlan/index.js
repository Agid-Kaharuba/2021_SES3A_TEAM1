// MAIN PAGE FOR BUILDING THE FLOOR PLAN 

import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, Divider, } from "@material-ui/core";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";

import { AuthContext } from "../../context/auth";

import KitchenItem from './kitchenItem';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600
      },
})


export default function FloorPlan() {
    const classes = useStyles();
   
    return (
        <div>
            {/* moveable kitchen objects */}
            <KitchenItem />
        </div>
   )
}