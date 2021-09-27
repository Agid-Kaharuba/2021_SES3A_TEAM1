import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, Divider, } from "@material-ui/core";
import styled from "styled-components";

import FloorPlan from '../../components/floorPlan';

const useStyles = makeStyles({
    bold: {
        fontWeight: 600
      },
})


export default function FloorPlanPage() {
    const classes = useStyles();
   
    return (
        <div>
            <Box m={5}>
                <Typography className={classes.bold} variant='h4'>
                    Floor Plan
                </Typography>
                <Divider variant="middle" />
            </Box>

            {/* 2D grid and kitchen objects */}
            <div>
                <FloorPlan />
            </div>
        </div>
   )
}