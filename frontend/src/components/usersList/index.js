import React from 'react';
import { Button, Typography, Box, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link} from "react-router-dom";

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
      minWidth: 650,
    },
  })


export default function Users({usersState}){
    const classes = useStyles();

    function buildUser(user) {
        return (
          <TableRow key={user.name}>
              <TableCell align="left">{user.firstname}</TableCell>
              <TableCell align="left">{user.lastname}</TableCell>
              <TableCell align="left">{user.staffid}</TableCell>
              <TableCell align="left">
              {/* <Link className={classes.underline} to={`/user/${user._id}`}>
                  <Button variant="outlined" color="secondary">View User</Button>
              </Link> */}
              </TableCell>
          </TableRow>
        )
        }

    return(
        <>
         <Box m={5}>
             <Grid container spacing={2} justify="space-between">
                <Grid item>
                    <Typography className={classes.bold} variant='h4'>
                    Users
                    </Typography>
                </Grid>
              </Grid>
            <Divider variant="middle" />
          </Box>
    
          <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} align="left">First Name</TableCell>
                            <TableCell className={classes.bold} align="left">Last Name</TableCell>
                            <TableCell className={classes.bold} align="left">Staff ID</TableCell>
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


