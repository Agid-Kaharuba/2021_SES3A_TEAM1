import React, { useState, useContext } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Button, Box, TextField, Typography } from "@material-ui/core";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
//import "./App.css";
//import './styles.j';

/*
const useStyles = makeStyles({
  body: {
    padding: '20px'
  },

  #content: {
    width: 100%
  },

  .react-grid-layout {
    background: #eee;
    margin-top: 10px;
  },

  .layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
  },

  .columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
  },

  .react-grid-item {
    box-sizing: border-box;
  },

  .react-grid-item:not(.react-grid-placeholder) {
    background: #ccc;
    border: 1px solid black;
  },

  .react-grid-item.resizing {
    opacity: 0.9;
  },

  .react-grid-item.static {
    background: #cce;
  },

  .react-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 24px;
  },

  .react-grid-item .minMax {
    font-size: 12px;
  },

  .react-grid-item .add {
    cursor: pointer;
  },

  .react-grid-dragHandleExample {
    cursor: move; // fallback if grab cursor is unsupported
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
  },

  .toolbox {
    background-color: #dfd;
    width: 100%;
    height: 120px;
    overflow: scroll;
  },

  .hide-button {
    cursor: pointer;
    position: absolute;
    font-size: 20px;
    top: 0px;
    right: 5px;
  },

  .toolbox__title {
    font-size: 24px;
    margin-bottom: 5px;
  },

  .toolbox__items {
    display: block;
  },

  .toolbox__items__item {
    display: inline-block;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 10px;
    margin: 5px;
    border: 1px solid black;
    background-color: #ddd;
  },

  .droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px;
  },

  .App {
    text-align: center;
  },

  .react-grid-layout {
    position: relative;
    transition: height 200ms ease;
  },

  .reactGridItem {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 200ms ease;
    transition-property: left, top;
    background: rgba(0, 132, 255, 0.473);
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
  }
  .deleteButton {
    position: absolute;
    top: 0%;
    left: 92%;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
})*/

import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayout = () => {
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    // { i: "widget1", x: 0, y: 0, w: 2, h: 2 },
    // { i: "widget2", x: 2, y: 2, w: 2, h: 2 },
    // { i: "widget3", x: 4, y: 4, w: 2, h: 2 },
  ]);
  const { authState } = useContext(AuthContext);

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray;
    setLayouts(layout);
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x;
      tempArray[Number(position.i)].y = position.y;
      tempArray[Number(position.i)].width = position.w;
      tempArray[Number(position.i)].height = position.h;
    });
    console.log(tempArray)
    setWidgetArray(tempArray);
  };

  const handleAdd = (name) => {
    setWidgetArray([
      ...widgetArray,
      // { i: name + " " + (widgetArray.length + 1), x: 0, y: 0, w: 1, h: 1, type: name },
      { i: name, x: 0, y: 0, w: 1, h: 1, type: name },
    ]);
  };

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice();
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key));
    tempArray.splice(index, 1);
    setWidgetArray(tempArray);
    console.log(widgetArray)
  };

  //try to print to consolve/web and then send to backend/unity
  const getCoordinates = () => {
    const token = authState.token;
    const data = {name: "floor1", coordinates: widgetArray};
    api.floor.create(token, data);
  }

  return (
    <div>
      <Box justifyContent='center' display="flex" m={6}>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Table")}>Add Table</Button>
        </Box>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Grill")}>Add Grill</Button>
        </Box>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Fridge")}>Add Fridge</Button>
        </Box>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Sink")}>Add Sink</Button>
        </Box>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Microwave")}>Add Microwave</Button>
        </Box>
        <Box m={1}>
          <Button color="primary" variant="contained" onClick={() => handleAdd("Submission Station")}>Add Submission Station</Button>
        </Box>
      </Box>

      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        isBounded={true}
        verticalCompact={false}
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={true}
        // cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        cols={{ lg: 5, md: 5, sm: 5, xs: 5, xxs: 5 }}
        autoSize={true}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >

        {widgetArray?.map((widget, index) => {
          return (
            <div
              className="reactGridItem"
              style={{backgroundColor: "cyan"}}
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                //minW: 1, maxW: Infinity, minH: 1, maxH: Infinity
                //These new dimensions are to scale with Unity
                // minW: 1, //1.4
                // maxW: 1, //1.4
                // minH: 1, //0.7
                // maxH: 1, //0.7
                isDraggable: true,
                isResizable: false,
              }}
            >
              <button
                className="deleteButton"
                onClick={() => handleDelete(widget.i)}
              >
                x
              </button>
              <div>
                <Box>{widget.i}</Box>
                <Box>x: {widget.x}</Box>
                <Box>y: {widget.y}</Box>
              </div>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
      <Button color="primary" variant="contained" onClick={() => getCoordinates()}>save</Button>
    </div>
  );
} //;

export default ReactGridLayout;
