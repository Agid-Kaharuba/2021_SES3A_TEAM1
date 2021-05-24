import React, { useState, useEffect, useContext } from "react";
import { Button, Typography, Divider, Box, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Users from "../../components/usersList/index.js";
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
    formControl: {
        minWidth: 200,
    },
})


export default function ViewCourse(props) {
    const courseId = props.match.params.courseId;
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    const [tasksState, setTasksState] = useState(undefined);
    const [usersState, setUsersState] = useState(undefined);
    const [courseState, setCourseState] = useState(undefined);
    const [editState, setEditState] = useState(true);
    
    // Get User Data
    const fetchUserData = async () => {
      const res = await api.user.all(authState.token);
      setUsersState(res.data);
    };
  
    useEffect(() => {
      if (usersState === undefined) {
        fetchUserData();
      }
    });

    //Get Tasks Data
    const fetchTasksData = async () => {
      const res = await api.task.getAll(authState.token);
      setTasksState(res.data);
    };
  
    useEffect(() => {
      if (tasksState === undefined) {
        fetchTasksData();
      }
    });

    // Edit Course Data
    const handleChange = (e) => {
        const { id, value } = e.target;
        setCourseState({ ...courseState, [id]: value })
    }

    const handleDropdown = (e) => {
        const { value } = e.target;
        setCourseState({ ...courseState, type: value })
    }

    const handleEdit = async (e) => {
        if (!editState) {
            console.log(courseState)
            const res = await api.course.update(authState.token, courseId, courseState);
        }
        setEditState(!editState);
    }

    const fetchCourseData = async () => {
        const res = await api.course.get(authState.token, courseId);
        console.log(res.data);
        setCourseState(res.data);
    };

    useEffect(() => {
        if (courseState === undefined) {
            fetchCourseData();
        }
    });
    if (courseState === undefined || usersState === undefined) {
        // TODO: add loader
        return (<h1>LOADING</h1>)
    }
    else {
        return (
            <>
                <Box m={5}>
                    <Grid container spacing={2} justify="space-between">
                        <Grid item>
                            <Typography className={classes.bold} variant='h4'>
                                Training
                       </Typography>
                        </Grid>
                        <Grid item align="right">
                            <Button variant="contained" style={{ width: 80 }} color={editState ? "secondary" : "primary"} size="large" onClick={handleEdit}>
                                {editState ? "Edit" : "Save"}
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" />
                </Box>
                <Box m={5}>
                    <Grid container spacing={2} direction="column" justify="space-between">
                        <Grid>
                            <Typography className={classes.bold} variant='h6'>
                                Training Name
                            </Typography>
                            <TextField value={courseState.name} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                        </Grid>
                        <Grid>
                            <Typography className={classes.bold} variant='h6'>
                                Training Description
                            </Typography>
                            <TextField value={courseState.description} id="description" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
                        </Grid>
                    </Grid>
                </Box>
                <Box m={5}>
                    <Typography className={classes.bold} variant='h6'>
                                Assigned Users
                    </Typography>
                    <Grid>
                        <Users usersState = {usersState}/>
                    </Grid>
                </Box>
                <Box m={5}>
                    <Typography className={classes.bold} variant='h6'>
                                Assigned Tasks
                    </Typography>
                    <Grid>
                        <Users tasksState = {tasksState}/>
                    </Grid>
                </Box>
            </>
        )
    }
}