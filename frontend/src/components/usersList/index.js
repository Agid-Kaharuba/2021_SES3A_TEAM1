import React from 'react';
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecoration: 'none'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650
  }
})


export default function Users({usersState, course}){
    const classes = useStyles();

    function buildUser(user) {
        return (
          <TableRow key={user.name}>
              <TableCell align="left">{user.firstname}</TableCell>
              <TableCell align="left">{user.lastname}</TableCell>
              <TableCell align="left">{user.staffid}</TableCell>
              {/* Don't know what is going here with the statistics */}
              {/* <TableCell align="left">
              {course && (<Link className={classes.underline} to={`/dashboard/${course._id}/statistics/${user._id}`}>
                  <Button variant="outlined" color="secondary">View Statistics</Button>
              </Link>)}
              </TableCell> */}
              <TableCell>
                <EditIcon/>
              </TableCell>
              <TableCell>
                <DeleteIcon/>
              </TableCell>
          </TableRow>
        )
        }

    return(

          <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} align="left">First Name</TableCell>
                            <TableCell className={classes.bold} align="left">Last Name</TableCell>
                            <TableCell className={classes.bold} align="left">Staff ID</TableCell>
                            {/* <TableCell align="right"></TableCell> */}
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersState && usersState.map((user) => {
                            return buildUser(user);
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
      </>
        );
}


