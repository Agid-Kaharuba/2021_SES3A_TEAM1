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

export default function ViewTraining(props) {
    const taskId = props.match.params.courseId;
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    const [trainingState, setTrainingState] = useState(undefined);
    const [editState, setEditState] = useState(true);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setTrainingState({ ...trainingState, [id]: value })
    }

    const handleDropdown = (e) => {
        const { value } = e.target;
        setTrainingState({ ...trainingState, type: value })
    }

    const handleEdit = async (e) => {
        if (!editState) {
            console.log(trainingState)
            const res = await api.task.update(authState.token, taskId, trainingState);
        }
        setEditState(!editState);
    }

    const fetchData = async () => {
        const res = await api.task.get(authState.token, courseId);
        console.log(res.data);
        setTrainingState(res.data);
    };

    useEffect(() => {
        if (trainingState === undefined) {
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
                                Training Overview
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
                            <TextField value={trainingState.name} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                        </Grid>
                        <Grid>
                            <Typography className={classes.bold} variant='h6'>
                                Training Description
                </Typography>
                            <TextField value={trainingState.description} id="description" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
                        </Grid>
                        

                    </Grid>

                </Box>
            </>
        )
    }
}