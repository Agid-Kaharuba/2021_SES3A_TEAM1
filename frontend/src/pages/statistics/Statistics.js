import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StatisticsComponent from '../../components/statistics';

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

// function createData(name, description, duration, view) {
//   return {name,description, duration, view};
// }

//0 is a placeholder for the view button
// const rows = [
//     createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10,0),
//     createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20,0),
//     createData('Task 3', 'Learn the safety terminology', 5,0)
// ];

export default function Statistics(props) {
  const courseId = props.match.params.courseId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [courseState, setCourseState] = useState(undefined);

  const fetchData = async () => {
    try {
      console.log(courseId)
      const res = await api.course.get(authState.token, courseId);
      setCourseState(res.data);
    }
    catch (err) {
      console.log(err)
      setCourseState({ description: "Cannot find module" });
    }
  };

  useEffect(() => {
    if (courseState === undefined) {
      fetchData();
    }
  });

  return (
    <StatisticsComponent>
      {courseState && (
        <>
          <Typography className={classes.bold} variant='h4'>
            Module: {courseState.name}
          </Typography>
          <Typography className={classes} variant="p">
            {courseState.description}
          </Typography>
        </>)}
    </StatisticsComponent>
  );

}