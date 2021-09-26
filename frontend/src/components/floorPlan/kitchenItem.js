// KITCHEN ITEMS FOR THE FLOOR PLAN

import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Typography, Divider, Card, CardContent, CardActions, Paper} from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import styled from "styled-components";

const useStyles = makeStyles({
    bold: {
        fontWeight: 600
      },
})


const BlockWrapper = styled("div")`
  position: absolute;
  background: blue;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  margin-right: 8px;
  flex-shrink: 0;
  height: 120px;
  width: 120px;
`;

const StyledText = styled("p")`
  font-weight: 800;
  font-size: 38px;
  color: white;
`;

const Block = () => {
    const [coordinate, setCoordinate] = React.useState({
      block: {
        x: 0,
        y: 0
      },
      // blocks: new Array(5).fill(1).map((_, index) => {
      //   const col = Math.floor(index % 5);
      //   const row = Math.floor(index / 5);
      //   return { x: col * 120 + col * 8, y: 120 * row + row * 8 };
      // }),
      pointer: { x: 0, y: 0 },
      // moving: false
      movingBlockIndex: null
    });
  
    const handleMouseMove = React.useCallback(
      (event) => {
        // if (!coordinate.moving) {
        if (coordinate.movingBlockIndex === null) {
          return;
        }
        const coordinates = { x: event.clientX, y: event.clientY };
  
        setCoordinate((prev) => {
          const diff = {
            x: coordinates.x - prev.pointer.x,
            y: coordinates.y - prev.pointer.y
          };
          return {
            // moving: true,
            // pointer: coordinates,
            
            ...prev,
            pointer: coordinates,
            // blocks: prev.blocks.map((b, index) =>
            //   prev.movingBlockIndex === index
            //     ? { x: b.x + diff.x, y: b.y + diff.y }
            //     : b
            // )
            block: { x: prev.block.x + diff.x, y: prev.block.y + diff.y }
          };
        });
      },
      // [coordinate.moving]
      [coordinate.movingBlockIndex]
    );
  
    const handleMouseUp = React.useCallback(() => {
      setCoordinate((prev) => ({
        ...prev,
        // moving: false
        movingBlockIndex: null
      }));
    }, []);
  
    const handleMouseDown = React.useCallback((event) => {
      const index = parseInt(event.target.getAttribute("data-index"), 10);
      const startingCoordinates = { x: event.clientX, y: event.clientY };
      
      setCoordinate((prev) => ({
        ...prev,
        pointer: startingCoordinates,
        // moving: true
        movingBlockIndex: index
      }));
      event.stopPropagation();
    }, []);

    return (
        <BlockWrapper
          style={{ top: coordinate.block.y, left: coordinate.block.x }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          
        >
          <StyledText>Oven</StyledText>
        </BlockWrapper>
    );
};

//https://dev.to/mukuljainx/how-to-create-a-2d-draggable-grid-with-react-spring-part-2-6dh

//take in kitchen item's name as parameter in futre****
export default function KitchenItem() { 
    const classes = useStyles();
   
    return (
        <div>
            {/* moveable kitchen objects */}
            <div>
                <Block />
                <Block />
            </div>
        </div>

        // <Draggable>
        //   <Box my={1}>
        //     dsds
        //   </Box>

        // </Draggable>
   )

}