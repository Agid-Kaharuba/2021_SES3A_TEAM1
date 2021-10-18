import React, { useContext, useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

import api from "../../helpers/api";
import { AuthContext } from "../../context/auth";

export default function Statistics(props) {
  const { authState } = useContext(AuthContext);
  const [courseState, setCourseState] = useState(undefined);
  const [trackingState, setTrackingState] = useState(undefined);
  const [performanceState, setPerformanceState] = useState(undefined);
  const [selected, setSelected] = useState({ userId: null, taskId: null, export: null });
  const courseId = props.match.params.courseId;

  const fetchData = async () => {
    try {
      var res = await api.course.get(authState.token, courseId);
      setCourseState(res.data);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (courseState === undefined) {
      fetchData();
    }
  });

  const updateSelected = async (newSelected) => {
    const updated = { ...selected, ...newSelected };
    const url = api.progress.download(updated.userId, courseId)
    setSelected({ ...updated, export: url });

    if (updated.userId && updated.taskId) {
      var res = await api.progress.get(authState.token, updated.userId, updated.taskId, courseId);
      setTrackingState(res.data[0].tracking);
    }
  }

  const performance = async () => {
    console.clear();
    var res = await api.progress.performance(authState.token, courseId);
    setPerformanceState(res.data);
    console.log(res.data);
  }

  return (<>
    <div style={{ display: "flex" }}>
      <List>
        {courseState && (
          courseState.assignedEmployees.map(employee =>
            <ListItem button key={employee._id} selected={selected.userId === employee._id} onClick={() => updateSelected({ ...selected, userId: employee._id })}>
              <ListItemText primary={`${employee.staffid} - ${employee.firstname} ${employee.lastname}`} />
              {selected.userId === employee._id && (
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
              )}
            </ListItem>
          )
        )}
      </List>
      <List>
        {courseState && (
          courseState.tasks.map(task =>
            <ListItem button key={task._id} selected={selected.taskId === task._id} onClick={() => updateSelected({ ...selected, taskId: task._id })}>
              <ListItemText primary={`${task.name}`} />
              {selected.taskId === task._id && (
                <ListItemIcon>
                  <ArrowRight />
                </ListItemIcon>
              )}
            </ListItem>
          )
        )}
      </List>
      <div>
        <Button variant="contained" color="primary" href={selected.export}>Export</Button>
        <Button variant="contained" color="primary" onClick={performance}>Performance</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell style={{ width: 20 }}>Rank</TableCell>
            <TableCell >Name</TableCell>
          </TableHead>
          <TableBody>
            {performanceState && (
              performanceState.ratings.map((performance, index) =>
                <TableRow style={
                  performance.recommendation ?
                    performance.recommendation.hire ?
                      { background: 'green' }
                      :
                      performance.recommendation.fire ? { background: 'red' }
                        :
                        {}
                    :
                    {}
                }>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{performance.user.staffid} {performance.user.firstname} {performance.user.lastname}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell style={{ width: 250 }}>Time</TableCell>
            <TableCell style={{ width: 250 }}>Event</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Data</TableCell>
          </TableHead>
          <TableBody>
            {trackingState && (
              trackingState.map(tracking =>
                <TableRow>
                  <TableCell>{tracking.date}</TableCell>
                  <TableCell>{tracking.event}</TableCell>
                  <TableCell>{tracking.value}</TableCell>
                  <TableCell>{JSON.stringify(tracking.data)}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </>);
}
