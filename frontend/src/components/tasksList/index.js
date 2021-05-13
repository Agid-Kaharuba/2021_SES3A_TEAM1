import React from 'react';
import { Button, Container, Typography, Box, Divider,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link} from "react-router-dom";
import BackButton from '../backbutton';

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


export default function Tasks({tasksState}){
    const classes = useStyles();

    function buildTask(task) {
        return (
          <TableRow key={task.name}>
              <TableCell align="left">{task.name}</TableCell>
              <TableCell align="left">{task.description}</TableCell>
              <TableCell align="left">{task.type}</TableCell>
              <TableCell align="left">
              <Link className={classes.underline} to={`/task/${task._id}`}>
                  <Button variant="outlined" color="secondary">View Task</Button>
              </Link>
              </TableCell>
          </TableRow>
        )
        }

    return(
        <>
         <Box m={5}>
             <Grid container spacing={2} justify="space-between">
               <BackButton/>
                <Grid item>
                    <Typography className={classes.bold} variant='h4'>
                    Tasks
                    </Typography>
                </Grid>
                <Grid item align="right">
                    <Button  variant="contained" color="primary" component={Link} to={"/taskslist/createtask"}>Create Task</Button>
                </Grid>
              </Grid>
            <Divider variant="middle" />
          </Box>
    
          <Box m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} align="left">Name</TableCell>
                            <TableCell className={classes.bold} align="left">Description</TableCell>
                            <TableCell className={classes.bold} align="left">Task Type</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksState && tasksState.map((task) => {
                            return buildTask(task);
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
        </>
        );
}


