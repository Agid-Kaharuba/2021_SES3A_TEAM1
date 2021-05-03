import React, { useEffect, useState, useContext } from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Card, CardContent, CardActions, Paper, Grid } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";

import { Link, Redirect } from "react-router-dom";
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

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CreateNewTrainingPage() {
  const classes = useStyles();
  const cardStyle = cardStyles();
  const { authState } = useContext(AuthContext);
  const [coursesState, setCoursesState] = useState(undefined);
  // const [coursesState, setCoursesState] = useState([{"name":"test","description":"asdsdf"},{"name":"test","description":"asdsdf"}]);

  const fetchData = async () => {
    const res = await api.course.getAll(authState.token);
    setCoursesState(res.data);
  };

  useEffect(() => {
    if (coursesState === undefined) {
      fetchData();
    }
  });

  const handleLaunchXR = (param) => {
  //handleLaunchXR(value) {
    //history.push('/xrt-training://?token=${authState.token}')
    //'xrt-training://?moduleId=${param}'
    window.open('xrt-training://courseID=' + param)
  }

  const buildCourse = (course) => {
    return (
      <Box mx={5} my={2}>
        <Paper>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                [{course._id}] {course.name} - {course.description}
              </Typography>
            
            </CardContent>
            <CardActions>
              <Button size="small">View Training</Button>
              <Button size="small" onClick={() => handleLaunchXR(course._id)}>Launch XR</Button>
            </CardActions>
          </Card>
        </Paper>
      </Box>
    )
  }

  return (
    <Box>

      <Box m={5}>
        <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='baseline'>
          <Grid item>
            <Typography className={classes.bold} variant='h4'>
              Dashboard
            </Typography>
          </Grid>
          <Grid item>
            <Button component={Link} color="primary" variant="contained" to={"/dashboard/create"}>
              Create Course
            </Button>
          </Grid>
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>        
      </Box>

      <Box m={5}>
        {coursesState ?
          coursesState.map((course) => {
            return buildCourse(course);
          })
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )
}