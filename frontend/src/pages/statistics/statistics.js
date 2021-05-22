import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, getContrastRatio } from "@material-ui/core";
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

export default function Statistics(props) {
  const courseId = props.match.params.courseId;
  const userId = props.match.params.userId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [courseState, setCourseState] = useState(undefined);
  const [statsState, setStatsState] = useState(undefined);
  const [userState, setUserState] = useState(undefined);
  const [img, setImg] = useState(undefined);

  const fetchData = async () => {
    try {
      console.log(courseId)
      var res = await api.course.get(authState.token, courseId);
      setCourseState(res.data);
      res = (await api.stats.course(authState.token, courseId, userId)).data;
      setStatsState(res)
      res = (await api.user.get(authState.token, userId)).data;
      setUserState(res)
      setImg(await api.user.download(authState.user.username))
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
    <StatisticsComponent tasksState={statsState?.tasks} dataState={statsState?.counts}>
      <Box>
        {courseState && (
          <>
            <Typography className={classes.bold} variant='h4'>
              Module
            </Typography>
            <Divider variant="middle" />
            <Typography className={classes.bold} variant='h6'>
              {courseState.name}
            </Typography>
            <Typography className={classes} variant="p">
              {courseState.description}
            </Typography>
          </>)}
      </Box>
      <Box my={5}>
        {userState && img && (
          <>
            <Typography className={classes.bold} variant='h4'>
              Employee
          </Typography>
            <Divider variant="middle" />
            <Typography className={classes.bold} variant='h6'>
            {userState.staffid} - {userState.firstname} {userState.lastname}
            </Typography>
            <br/>
            <img src={img.data} alt="profile image" />
          </>)}
      </Box>
    </StatisticsComponent>
  );

}