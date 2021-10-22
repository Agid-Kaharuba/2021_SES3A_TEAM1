import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Button, Box, TextField } from "@material-ui/core";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
//import "./App.css";
import './styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ReactGridLayout = () => {
  const [layouts, setLayouts] = useState(null);
  const [widgetArray, setWidgetArray] = useState([
    // { i: "widget1", x: 0, y: 0, w: 2, h: 2 },
    // { i: "widget2", x: 2, y: 2, w: 2, h: 2 },
    // { i: "widget3", x: 4, y: 4, w: 2, h: 2 },
  ]);

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
  };

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
    </div>
  );
};

export default ReactGridLayout;