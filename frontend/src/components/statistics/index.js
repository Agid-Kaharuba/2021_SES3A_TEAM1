import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from '../Chart';
import Tasks from "../tasksList/index.js"

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

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

export default function StatisticsComponent(props) {
    const { tasksState } = props;
    const classes = useStyles();
    return (
        <>
            <Box m={5}>
                <Grid container spacing={2} justify="space-between">
                    <Grid item>
                        <Typography className={classes.bold} variant='h4'>
                            Statistics
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <Grid container>
                    <Grid item style={{ flex: 0.4 }}>
                        <Box m={5}>
                            {props.children}
                        </Box>
                    </Grid>
                    <Grid item style={{ margin: "auto", flex: 0.6 }}>
                        <Chart />
                    </Grid>
                </Grid>
            </Box>
            <Tasks tasksState={tasksState} hiddenCreate={true} />
        </>
    );

}