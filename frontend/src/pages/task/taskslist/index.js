import React, { useState, useEffect, useContext } from "react";
import Tasks from "../../../components/Task/list.js";
import { Button, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";


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

// function createData(name, description, duration, view) {
//   return {name,description, duration, view};
// }

//0 is a placeholder for the view button
// const rows = [
//     createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10,0),
//     createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20,0),
//     createData('Task 3', 'Learn the safety terminology', 5,0)
// ];



export default function TasksList() {
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [tasksState, setTasksState] = useState(undefined);

  const fetchData = async () => {
    const res = await api.task.getAll(authState.token);
    setTasksState(res.data);
  };

  useEffect(() => {
    if (tasksState === undefined) {
      fetchData();
    }
  });

  return (
    <>
      <Box m={5}>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Tasks
            </Typography>
          </Grid>
          <Grid item align="right">
            <Button variant="contained" color="primary" component={Link} to={"/task/create"}>Create Task</Button>
          </Grid>
        </Grid>
        <Divider variant="middle" />
      </Box>
      <Tasks tasksState={tasksState} />
    </>
  );

}