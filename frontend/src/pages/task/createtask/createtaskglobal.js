import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import {
  Box, Button, Typography, Dialog, Snackbar, IconButton
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';

import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";

import Task from "../../../components/Task";

const useStyles = makeStyles(theme => ({
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
  formControl: {
    margin: 2,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}));

export default function CreateNewTaskGlobalDialog(props) {
  const { authState, setAuthState } = React.useContext(AuthContext);
  const classes = useStyles();

  const [formState, setFormState] = useState({ name: "", description: "", recipe: undefined });
  const [editState, setEditState] = useState(true);
  let history = useHistory();

  // open notification
  const [resultState, setResultState] = useState(undefined);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [severity, setSeverity] = useState(undefined);
  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const { onClose: onCloseTraining, open: openTask } = props;
  const handleCloseTask = () => {
    onCloseTraining();
  };

  const handleChange = async (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState, [name]: value,
    });
  }

  const handleRecipe = (recipe) => {
    setFormState({
      ...formState, recipe: recipe,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResultState("Submitting");
    try {
      if (formState.recipe && formState.recipe._id == undefined) {
        try {
          const res = await api.recipe.create(authState.token, formState.recipe);
          formState.recipe._id = res.data._id;
        }
        catch (err) {
          console.log(err);
        }
      }
      const res = await api.task.create(authState.token, formState);
      props.createdTask(res.data);
      setResultState("Success");
      setOpenNotification(true);
      setSeverity("success");

      handleCloseTask();
    }
    catch (err) {
      setResultState(err.response.data.err);
      setOpenNotification(true);
      setSeverity("error");
    }
  }

  const buildResult = () => {
    return (
      <div>
        <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <MuiAlert onClose={handleCloseNotification} severity={severity} elevation={6} variant="filled">{resultState}</MuiAlert>
        </Snackbar>
      </div>
    );
  };

  function DialogTitle(props) {
    const classes = useStyles();
    const { children, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }

  return (
    <div>
      <Dialog onClose={handleCloseTask} open={openTask} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="md">
        <DialogTitle onClose={handleCloseTask}>Create New Task</DialogTitle>
        <Box m={5}>
          <Typography variant='h6'>
            Please enter the details of your desired task below.
          </Typography>
          <Task handleChange={handleChange} taskState={formState} editState={editState} handleRecipe={handleRecipe} />
        </Box>

        <Box justifyContent='center' display="flex" m={6}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Dialog>
      {resultState !== undefined && buildResult()}
    </div>
  )
}