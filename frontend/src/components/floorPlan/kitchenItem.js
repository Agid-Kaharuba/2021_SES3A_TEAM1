// KITCHEN ITEMS FOR THE FLOOR PLAN

import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, Divider, } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles({
    bold: {
        fontWeight: 600
      },
})


//*************** temporary code from https://codesandbox.io/s/uequ3?file=/src/App.js
//for testing

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
      pointer: { x: 0, y: 0 },
      moving: false
    });
  
    const handleMouseMove = React.useCallback(
      (event) => {
        if (!coordinate.moving) {
          return;
        }
        const coordinates = { x: event.clientX, y: event.clientY };
  
        setCoordinate((prev) => {
          const diff = {
            x: coordinates.x - prev.pointer.x,
            y: coordinates.y - prev.pointer.y
          };
          return {
            moving: true,
            pointer: coordinates,
            block: { x: prev.block.x + diff.x, y: prev.block.y + diff.y }
          };
        });
      },
      [coordinate.moving]
    );
  
    const handleMouseUp = React.useCallback(() => {
      setCoordinate((prev) => ({
        ...prev,
        moving: false
      }));
    }, []);
  
    const handleMouseDown = React.useCallback((event) => {
      const startingCoordinates = { x: event.clientX, y: event.clientY };
      setCoordinate((prev) => ({
        ...prev,
        pointer: startingCoordinates,
        moving: true
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

//************* */



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
   )
}