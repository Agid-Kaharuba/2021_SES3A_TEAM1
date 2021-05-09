import React, { useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from '@material-ui/core/ListSubheader';

// import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";


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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 2,
    flex: 1,
  },
})

function createData(name, description, recipe, task) {
  return { name, description, recipe, task };
}

const rows = [
  createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10, 0),
  createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20, 0),
  createData('Task 3', 'Learn the safety terminology', 5, 0),
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNewTrainingPage() {
  const classes = useStyles();


  //SAVE COURSE
  const [formState, setFormState] = useState({name: "", description: ""});
  const { authState, setAuthState } = React.useContext(AuthContext);
  let history = useHistory();

  const handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState, [name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    api.course.create(authState.token, formState);
    history.push('/dashboard');
  }


  // CREATE TASKS
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

  const buildTask = (task) => {
    return (
      <TableRow key={task.name}>
        <TableCell align="left">{task.name}</TableCell>
        <TableCell align="left">{task.description}</TableCell>
        <TableCell align="left">{task.recipe}</TableCell>
        <TableCell align="right">
        <Button component={Link} color="secondary" variant="outlined" to={"/dashboard/create"}>
            View
          </Button>
        </TableCell>
      </TableRow>
    )
  }


  //ASSIGN EMPLOYEE
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [usersState, setUsersState] = useState(undefined);

  const fetchDataUser = async () => {
    const res = await api.user.all(authState.token);
    setUsersState(res.data);
  };

  useEffect(() => {
    if (usersState === undefined) {
      fetchDataUser();
    }
  });

  const [checked, setChecked] = React.useState([1]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const buildUser = (user) => {
    return (
      <div>
        {[0].map((value) => {
        const labelId = `checkbox-list-secondary-label-${user}`;
        return (
          <ListItem key={user} button>
            <ListItemAvatar>
              <Avatar
                // alt={`Avatar n°${user + 1}`}
                // src={`/static/images/avatar/${user + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={user.firstname + " " + user.lastname} alignItems="flex-start"
            secondary={user.staffid}/>
            
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(user)}
                checked={checked.indexOf(user) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      </div>
    )
  }

  //Build User Table
  const fetchDataUserTable = async () => {
    const res = await api.user.get(authState.token);
    setUsersState(res.data);
  };

  useEffect(() => {
    if (usersState === undefined) {
      fetchDataUserTable();
    }
  });

  const buildUserTable = (user) => {
    return (
      <TableRow key={user}>
        <TableCell align="left">{user.firstname + " " + user.lastname}</TableCell>
        <TableCell align="left">{user.staffid}</TableCell>
        <TableCell align="right">
          <Button component={Link} color="secondary" variant="outlined" to={"/statistics"}>
            View
          </Button>
        </TableCell>
      </TableRow>
    )
  }


  return (
    <div>
      <Box m={5}>
        <Typography className={classes.bold} variant='h4'>
          Create New Training
        </Typography>
        <Divider variant="middle" />
      </Box>

      <Box m={5}>
        <Box my={2}>
          <Typography variant='h5'>
            Training Details
          </Typography>
        </Box>

        <Box my={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Training's Name"
            fullWidth='true'
            variant="filled"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box my={2}>
          <TextField
            id="filled-multiline-static"
            label="Enter the Training's Description"
            multiline
            rows={4}
            fullWidth='true'
            variant="filled"
            name="description"
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box m={5}>
        <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='baseline'>
          <Grid item xs={9}>
            <Typography variant='h5'>
              Tasks
            </Typography>
          </Grid>

          <Grid item>
            <Button component={Link} color="secondary" variant="contained" to={"/dashboard/create"}>
              Add Task
            </Button>
          </Grid>
          <Grid item >
            <Button component={Link} color="primary" variant="contained" to={"/createTask"}>
              Create Task
            </Button>
          </Grid>
 
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>        
      </Box>

      <Box m={5}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Task Type</TableCell>
                <TableCell align="right">View Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {tasksState ?
                  tasksState.map((task) => {
                    return buildTask(task);
                  })
                  :
                  <h1>LOADING</h1>
                }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box m={5}>
        <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='baseline'>
          <Grid item>
            <Typography variant='h5'>
              Assigned Employees
            </Typography>
          </Grid>
          <Grid item>
            <div>
              <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Assign
              </Button>
              <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Available Employees
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      Save
                    </Button>
                  </Toolbar>
                </AppBar>
                <List>
                <ListSubheader component="div" id="nested-list-subheader">
                  Select the employees to add to this course.
                </ListSubheader>
                  {usersState ?
                  usersState.map((user) => {
                    return buildUser(user);
                  })
                  :
                  <h1>LOADING</h1>
                }
                </List>
              </Dialog>
            </div>
          </Grid>
        </Grid>
        <Box my={1}>
          <Divider variant="middle" />
        </Box>        
      </Box>
      

      <Box m={5}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Staff ID</TableCell>
                <TableCell align="right">View Profile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersState ?
                  usersState.map((user) => {
                    return buildUserTable(user);
                  })
                  :
                  <h1>LOADING</h1>
                }
            </TableBody>
          </Table>
        </TableContainer>
      </Box> 

      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained" color="secondary" component={Link} to="/dashboard">
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </div>
  )
}