import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Divider, Box, FormControl, Select, MenuItem, InputLabel, Grid, TextField } from "@material-ui/core";
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
    formControl: {
        minWidth: 200,
    },
})


export default function ViewTask(props) {
    const taskId = props.match.params.taskId;
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    const [taskState, setTaskState] = useState(undefined);
    const [editState, setEditState] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTaskState({ ...taskState, [id]: value })
    }

    const handleDropdown = (e) => {
        const { value } = e.target;
        setTaskState({ ...taskState, type: value })
    }

    const handleEdit = async (e) => {
        if (!editState) {
            console.log(taskState)
            const res = await api.task.update(authState.token, taskId, taskState);
        }
        setEditState(!editState);
    }

    const fetchData = async () => {
        const res = await api.task.get(authState.token, taskId);
        console.log(res.data);
        setTaskState(res.data);
    };

    useEffect(() => {
        if (taskState === undefined) {
            fetchData();
        }
    });
    if (taskState === undefined) {
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
                                Task
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
                                Task Name
                </Typography>
                            <TextField value={taskState.name} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                        </Grid>
                        <Grid>
                            <Typography className={classes.bold} variant='h6'>
                                Task Description
                </Typography>
                            <TextField value={taskState.description} id="description" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
                        </Grid>
                        <Grid>
                            <Typography className={classes.bold} variant='h6'>
                                Task Type
                </Typography>
                            <FormControl disabled={editState} className={classes.formControl}>
                                <Select value={taskState.type} onChange={handleDropdown}>
                                    <MenuItem value="Practice">Practice </MenuItem>
                                    <MenuItem value="Testing">Testing</MenuItem>
                                    <MenuItem value="Performance" >Performance</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            margin="normal">
                        </Grid>

                    </Grid>
                </Box>
            </>
        )
    }
}