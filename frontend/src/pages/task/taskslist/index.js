import React, { useState, useEffect, useContext } from "react";
import Tasks from "../../../components/Task/list.js";
import { Box, Button, Typography, Divider, Card, CardContent, CardActions, CardActionArea, CardMedia, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 250,
    textDecoration: 'none',
    height: 315
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
    backgroundSize: 'contain'
  },
  gridContainer: {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  trainingModules: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4,1fr)'
  },
  trainingImage: {
    height: 143,
    backgroundSize: 'contain',
    marginBottom: 45
  },
  buttons: {
    marginLeft: 10
  },
  text: {
    textAlign: 'center'
  },
  actionArea: {
    height: 315
  }
})


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

  const createTaskModules = () => {
    return(
      <div className = {classes.trainingModules}>
       {tasksState.map((task) => {
         return buildTask(task);
       })}
       {/* Line checks if the user is a supervisor and show create training button if they are. */}
       {authState.user.isSupervisor && (

           <Grid container className={classes.gridContainer}>
           <Grid item xs={12} sm={6} md={3}>
             <Link to={"/dashboard/create"} className={classes.underline}>
             <Card className={classes.root} variant="outlined">
               <CardActionArea className={classes.actionArea}>
               <CardMedia className={classes.trainingImage}
               //these images are just placeholders for now
               image="https://icons.veryicon.com/png/o/miscellaneous/standard-general-linear-icon/plus-60.png"
               title="Create New Training"
               />
               <CardContent className={classes.text}>
                 <Typography gutterBottom variant="h6" component="h2">
                   Create New Task
                 </Typography>
               </CardContent>
               </CardActionArea>
               </Card>
               </Link>
             </Grid>
             
           </Grid>
       )}
   </div>
    )
 }

 const buildTask = (task) => {
   return (
     <Grid container className={classes.gridContainer}>
       <Grid item xs={12} sm={6} md={3}>
         <Card className={classes.root} variant="outlined">
           <CardActionArea className={classes.actionArea}>
           <CardMedia 
           className={classes.media}
            //these images are just placeholders for now
           image="https://i.pinimg.com/originals/8b/f0/76/8bf07692b7f9704f1b3552943bdcf1cd.jpg"
           title="Fast Food Training"
           />
           <CardContent className={classes.text}>
             <Typography gutterBottom variant="h6" component="h2">
             {task.name}
           </Typography>
             <Typography variant="body1" color="textSecondary" gutterBottom>
                {task.description}
             </Typography>
           </CardContent>

           <CardActions className= {classes.buttons}>
             <Link className={classes.underline} to={`/task/${task._id}`}>
               <Button size="small">View Task</Button>
             </Link>
           </CardActions>
           </CardActionArea>
         </Card>
         </Grid>
         
     </Grid>
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
             Tasks
           </Typography>
         </Grid>
         <Grid item>
           {authState.user.isSupervisor}
         </Grid>
       </Grid>
       <Box my={1}>
         <Divider variant="middle" />
       </Box>
     </Box>

     <Box m={5}>
       {tasksState ?
         createTaskModules()
         :
         <h1>LOADING</h1>
       }
     </Box>
   </Box>
 )
}