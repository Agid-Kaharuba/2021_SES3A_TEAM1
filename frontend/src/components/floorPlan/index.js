// MAIN PAGE FOR BUILDING THE FLOOR PLAN 

import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, Divider, } from "@material-ui/core";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled from "styled-components";

import { AuthContext } from "../../context/auth";

import KitchenItem from './kitchenItem';
import ToolboxLayout from './gridOld';
import ToolBox from './gridOld';
import ToolBoxItem from './gridOld';
import ReactGridLayout from './grid';


const useStyles = makeStyles({
    bold: {
        fontWeight: 600
      },
    back:{
        color: 'black'
    },
})


export default function FloorPlan() {
    const classes = useStyles();
   
    return (
        <div className={classes.back}>
            {/* <ToolboxLayout/> */}
            <ReactGridLayout/>

        </div>
   )
}