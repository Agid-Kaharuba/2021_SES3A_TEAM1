import React from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";


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
})

function createData(name, description, duration, task) {
  return { name, description, duration, task };
}

const rows = [
  createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10, 0),
  createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20, 0),
  createData('Task 3', 'Learn the safety terminology', 5, 0),
];

export default function CreateNewTrainingPage() {
  const classes = useStyles();
//   const { authState, setAuthState } = React.useContext(AuthContext);

//   if (authState.authenticated) {
//     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
//   } else {
  return (
    <div>
      <Box m={5}>
        <Typography className={classes.bold} variant='h4'>
          Create New Training
        </Typography>
        <Divider variant="middle" />
      </Box>

      {/* https://www.npmjs.com/package/material-ui-dropzone */}
      <Box m={5}>
        <Box m={2}>
          <Typography variant='h5'>
            Upload Training Photo
          </Typography>
        </Box>

        <DropzoneArea/>
        <Box m={2}>
          <Button variant="contained" component="label">
            Upload Photo
            <input type="file" hidden/>
          </Button>
        </Box>
      </Box>

      <Box m={5}>
        <Box m={2}>
          <Typography variant='h5'>
            Training Details
          </Typography>
        </Box>

        <Box m={2}>
          <TextField
              id="filled-multiline-static"
              label="Enter the Training's Name"
              fullWidth='true'
              variant="filled"
            />
        </Box>
        <Box m={2}>
          <TextField
              id="filled-multiline-static"
              label="Enter the Training's Description"
              multiline
              rows={4}
              fullWidth='true'
              variant="filled"
            />
        </Box>
      </Box>

      <Box m={5}>
        <Typography className={classes.bold} variant='h5'>
          Tasks
        </Typography>
        <Divider variant="middle" />
      </Box>

      <Box m={5}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">View Task</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.duration}</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      <Box justifyContent='center' display="flex" m={6}>
        <Box mr={6}>
          <Button variant="contained"color="secondary">
          Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary">
          Save
          </Button>
        </Box>
      </Box>
    </div>
    )
}