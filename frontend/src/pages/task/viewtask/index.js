import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Typography,
  Divider,
  Box,
  FormControl,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingSpinner from "../../../components/loadingSpinner/index.js";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import api from "../../../helpers/api";
import BackButton from "../../../components/backbutton/index.js";
import Task from "../../../components/Task/task";

const useStyles = makeStyles({
  bold: {
    fontWeight: 600,
  },
  underline: {
    textDecorationLine: "underline",
  },
  italic: {
    fontStyle: "italic",
  },
  formControl: {
    minWidth: 200,
  },
});

export default function ViewTask(props) {
  const taskId = props.match.params.taskId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [taskState, setTaskState] = useState(undefined);
  const [editState, setEditState] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTaskState({ ...taskState, [id]: value });
  };

  const handleDropdown = (e) => {
    const { value } = e.target;
    setTaskState({ ...taskState, type: value });
  };

  const handleRecipe = (recipe) => {
    setTaskState({
      ...taskState,
      recipe: recipe,
    });
  };

  const handleEdit = async (e) => {
    if (editState) {
      console.log(taskState);
      try {
        const res = await api.task.update(authState.token, taskId, taskState);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    setEditState(!editState);
  };

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
    return <LoadingSpinner></LoadingSpinner>;
  } else {
    return (
      <Container maxWidth="lg">
        <Box m={5}>
          <Grid container spacing={2} justify="flex-start" direction="row">
            <Grid item>
              <Typography className={classes.bold} variant="h4">
                Task
              </Typography>
            </Grid>
          </Grid>
          <Divider variant="middle" />
        </Box>
        <Box m={5}>
          <Grid
            container
            spacing={2}
            direction="column"
            justify="space-between"
          >
            <Task
              handleChange={handleChange}
              taskState={taskState}
              editState={editState}
              handleRecipe={handleRecipe}
            />

            <Box justifyContent="center" display="flex" m={6}>
              <Box mr={6}>
                <BackButton></BackButton>
              </Box>
              {authState.user.isSupervisor && (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                  >
                    {editState ? "Save" : "Edit"}
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Box>
      </Container>
    );
  }
}
