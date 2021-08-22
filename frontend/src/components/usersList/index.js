import React from 'react';
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";

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
    const [search, setSearch] = React.useState("");

    function handleChange(e) {
      const { name, value } = e.target;
      setSearch(value)
      console.log(value)
    }

    function filter(user) {
      const re = new RegExp(search.toLowerCase());
      if (!search) {
        return true
      }
      return re.test(user.staffid) || re.test(user.firstname.toLowerCase()) || re.test(user.lastname.toLowerCase())
    }

    function onDeleteClick(user) {
      console.log(user)
    }

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
                {/* TODO: once backend creates the delete user endpoint, update the onClick below: */}
              <IconButton
                onClick={() => onDeleteClick(user)}
              >
                <DeleteIcon/>
              </IconButton>
              </TableCell>
          </TableRow>
        )
        }

    return(
      <>
        <Container maxWidth="md">
         <Box m={5}>
             <Grid container spacing={2} justify="space-between">
                <Grid item>
                    <Typography className={classes.bold} variant='h4'>
                    Users
                    </Typography>
                </Grid>
              <div className={classes.margin}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <TextField id="user-search" label="Search" onChange={handleChange}/>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            <Divider variant="fullwidth" />
          </Box>
    
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
                        {usersState && usersState.filter(filter).map((user) => {
                            return buildUser(user);
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
        </Container>
      </>
        );
}


