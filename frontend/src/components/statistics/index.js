import React, { useState, useEffect, useContext } from "react";
import { Button, Link, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Chart from '../Chart';
import Tasks from "../Task/list.js"

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

function Tasks({ tasksState }) {
    const classes = useStyles();

    function buildTask(task) {
        return (
            <TableRow key={task.name}>
                <TableCell align="left">{task.task.name}</TableCell>
                <TableCell align="left">{task.task.description}</TableCell>
                <TableCell align="left">{task.task.type}</TableCell>
                <TableCell align="left">{task.progress?.score || "-"}</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <Box m={5}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.bold} align="left">Name</TableCell>
                                <TableCell className={classes.bold} align="left">Description</TableCell>
                                <TableCell className={classes.bold} align="left">Task Type</TableCell>
                                <TableCell className={classes.bold} align="left">Score</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasksState && tasksState.map((task) => {
                                return buildTask(task);
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}


export default function StatisticsComponent(props) {
    const { tasksState, dataState } = props;
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
                        {tasksState && <Chart data={[dataState['Practice'], dataState['Test'], dataState['Performance']]} />}
                    </Grid>
                </Grid>
            </Box>
            {tasksState && (<Tasks tasksState={tasksState} hiddenCreate={true} />)}
        </>
    );

}