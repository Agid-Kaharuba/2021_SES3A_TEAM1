import React, { useState, useEffect, useContext } from "react";
import Tasks from "../../../components/Task/list.js";
import { Box, Button, Typography, Divider, Card, CardContent, CardActions, CardActionArea, CardMedia, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
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

  const testMethod = () => {
    return(
      <div className = {classes.tasks}>
       {tasksState.map((task) => {
         return buildTask(task);
       })}
       
       {authState.user.isSupervisor && (
         <Grid item xs={12} sm={6} md={3}>
         <Card className={classes.root} variant="outlined" style={{ textDecoration: 'none' }} component={Link} to={"/task/create"}>
           <CardActionArea>
           <CardMedia 
           className={classes.media}
           //these images are just placeholders for now
           image="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png"
           title="Fast Food Training"
           />
           <CardContent>
             <Typography align="center" gutterBottom variant="h6" component="h2">
             Create New Task
           </Typography>
           </CardContent>
           </CardActionArea>
         </Card>
         </Grid>
       )}
   </div>
    )
 }
  const buildTask = (task) => {
    return (
      <Box mx={5} my={2}>
        <Paper>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {task.name} - {task.description}
              </Typography>

            </CardContent>
            <CardActions>
              <Link className={classes.underline} to={`/dashboard/${task._id}`}>
                <Button size="small">View Task</Button>
              </Link>
            </CardActions>
          </Card>
        </Paper>
      </Box>
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
        {tasksState ?
          testMethod()
          :
          <h1>LOADING</h1>
        }
      </Box>
    </Box>
  )

}