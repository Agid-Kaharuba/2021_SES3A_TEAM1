import React from "react";
// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from "@material-ui/core/styles";

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";
import PropTypes from "prop-types";

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

const progressBar = props => {
    const { value, max} = props;

    return <progress value={value} max={max} />
};

progressBar.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number
};

progressBar.defaultProps = {
    max: 100
};

export default function CreateNewTraining() {
  const classes = useStyles();
//   const { authState, setAuthState } = React.useContext(AuthContext);

//   if (authState.authenticated) {
//     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
//   } else {
  return (
    <div>
    <Box m={5}>
    <progressBar value={40} max={100}/>
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
    </Box>
    </div>
    )
}