import React, { useEffect, useState, useContext } from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, Card, CardContent, CardActions, Paper, Grid, CardMedia, CardActionArea } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";


const useStyles = makeStyles({
  root: {
    // maxWidth:345,
    minWidth: 250
    // position: 'relative'
  },
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecorationLine: 'none'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650,
  },
  media: {
    height: 143,
  },
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px',
    // flexWrap: 'nowrap'
  }
})



export default function CreateNewTrainingPage() {
  const classes = useStyles();
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

  //Passes courseID and authState token to launch XR training module
  const handleLaunchXR = (courseID) => {
    const token = authState.token
    window.open('xrt-training://?courseId=' + courseID + '&token=' + token)
  }

   const testMethod = () => {
     return(
       <div>
    {coursesState.map((course) => {
      return buildCourse(course);
    })}
    
     {authState.user.isSupervisor && (
      <Grid item xs={12} sm={6} md={3}>
      <Card className={classes.root} variant="outlined" style={{ textDecoration: 'none' }} component={Link} to={"/dashboard/create"}>
        <CardActionArea>
        <CardMedia 
        className={classes.media}
        //these images are just placeholders for now
        image="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png"
        title="Fast Food Training"
        />
        <CardContent>
          <Typography align="center" gutterBottom variant="h6" component="h2">
          Create New Training
        </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
     )}
    </div>
     )
  }

  const buildCourse = (course) => {
    return (
      <Grid container spacing={4} className={classes.gridContainer}  direction="row" justifyContent="center" alignItems="center" wrap="nowrap">
        <Grid item xs={12} sm={6} md={3}>
          <Card className={classes.root} variant="outlined">
            <CardActionArea>
            <CardMedia 
            className={classes.media}
            image="https://static.thenounproject.com/png/1176750-200.png"
            title="Fast Food Training"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
              {course.name}
            </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                 {course.description}
              </Typography>
            </CardContent>

            <CardActions>
              <Link className={classes.underline} to={`/dashboard/${course._id}`}>
                <Button size="small">View Training</Button>
              </Link>
              <Button size="small" onClick={() => handleLaunchXR(course._id)}>Launch XR</Button>
            </CardActions>
            </CardActionArea>
          </Card>
          </Grid>
          
      </Grid>
    )
  }

 
  //Course is now changed to Training
  //Line 104 checks if the user is a supervisor and show create training button if they are.
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
          {/* <Grid item>
            {authState.user.isSupervisor && (
              <Button component={Link} color="primary" variant="contained" to={"/dashboard/create"}>
                Create Training
              </Button>)}
          </Grid> */}
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>
      </Box>

      <Box m={5}>
        {coursesState ?
          testMethod()
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )
}