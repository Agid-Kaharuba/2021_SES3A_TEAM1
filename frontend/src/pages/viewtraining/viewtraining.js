import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Divider, Box, Grid, TextField, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Users from "../../components/usersList/index.js";
import Tasks from "../../components/Task/list.js";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import PlaceholderImage from "../../components/uploadImage/index.js";
import bbt from "../../images/bbt.jpg";
import { TabPanel } from "../../components/TabPanel"
import { TrainingReport } from "../../components/TrainingReport"

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
  flex: {
    display: 'flex',
  },
  container: {
    width: "20%",
  },
  trainDiv: {
    width: "80%",
  },
  imagedisplay: {
    display: "none",
  }
})


export default function ViewCourse(props) {
  const courseId = props.match.params.courseId;
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const [tasksState, setTasksState] = useState(undefined);
  const [usersState, setUsersState] = useState(undefined);
  const [courseState, setCourseState] = useState(undefined);
  const [editState, setEditState] = useState(true);
  const [imagesrc, setImagesrc] = useState(bbt);
  const [tabState, setTabState] = useState(0);

  // Edit Course Data
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCourseState({ ...courseState, [id]: value })
  }

  const handleDropdown = (e) => {
    const { value } = e.target;
    setCourseState({ ...courseState, type: value })
  }

  const imageChange = (e) => {
    setImagesrc(e);
    setCourseState({ ...courseState, image: e })
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
    setImagesrc(res.data.image || bbt);
  };

  useEffect(() => {
    if (courseState === undefined) {
      fetchCourseData();
    }
  });

  const buildTrainingConfiguration = () => {
    return (<>
      <Box m={5}>
        <Typography className={classes.bold} variant='h6'>
          Assigned Users
        </Typography>
        <Grid>
          <Users usersState={courseState.assignedEmployees} course={courseState} />
        </Grid>
      </Box>
      <Box m={5}>
        <Typography className={classes.bold} variant='h6'>
          Assigned Tasks
        </Typography>
        <Grid>
          <Tasks tasksState={courseState.tasks} />
        </Grid>
      </Box>
    </>)
  }

  const buildTrainingReportSummary = () => {
    return (<Box m={5}>
      <TrainingReport courseId={courseId} courseState={courseState} />
    </Box>)
  }

  if (courseState === undefined) {
    // TODO: add loader
    return (<h1>LOADING</h1>)
  }
  else {
    return (
      <Container maxWidth="lg">
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
          <Box m={5}>
            <Grid container>
              <Grid item sm={12} md={3}>
                <PlaceholderImage imageChange={imageChange} imagesrc={imagesrc} editState={editState} />
              </Grid>
              <Grid item sm={12} md={9}>
                <Typography className={classes.bold} variant='h6'>
                  Training Name
                </Typography>
                <TextField value={courseState.name} id="name" disabled={editState} variant="outlined" fullWidth margin='normal' onChange={handleChange} />
                <Typography className={classes.bold} variant='h6'>
                  Training Description
                </Typography>
                <TextField value={courseState.description} id="description" disabled={editState} variant="outlined" fullWidth margin='normal' multiline rows={10} onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box m={5}>
          <Tabs
            value={tabState}
            onChange={(event, newValue) => setTabState(newValue)} >
            <Tab label="Configuration" />
            <Tab label="Reporting" />
          </Tabs>
          <TabPanel value={tabState} index={0}>
            {buildTrainingConfiguration()}
          </TabPanel>
          <TabPanel value={tabState} index={1}>
            {buildTrainingReportSummary()}
          </TabPanel>
        </Box>
      </Container >
    )
  }
}