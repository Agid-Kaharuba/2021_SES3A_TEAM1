import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from './components/Chart';

const useStyles = makeStyles({
    bold: {
      fontWeight: 600
    },
    underline: {
      textDecorationLine: 'underline'
    },
    italic: {
      fontStyle: 'italic'
    },
    table: {
      minWidth: 650,
    },
  })


export default function Statistics() {
    const classes = useStyles();

    return(
    <>
     <Box m={5}>
         <Chart />
      </Box>
    </>
    );

}