import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, Box, FormControl, Select, MenuItem, InputLabel, Grid, TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

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
  })


export default function ViewTask() {
    const classes = useStyles();
return(
<Box m={5}>

         <Grid container spacing={2} direction="column" justify="space-between">
            <Grid item>
                <Typography className={classes.bold} variant='h4'>
                TASK NAME
                </Typography>
                <underline/>
            </Grid>
            <Grid>
                <Typography className={classes.bold} variant='h6'>
                    Task Name
                </Typography>
                <TextField variant="outlined" fullWidth margin='normal'/>
            </Grid>
            <Grid>
                <Typography className={classes.bold} variant='h6'>
                    Task Description
                </Typography>
                <TextField variant="outlined" fullWidth margin='normal' multiline rows={10}/>
            </Grid>
            <Grid>
                <Typography className={classes.bold} variant='h6'>
                    Task Type
                </Typography>
                <FormControl className={classes.formControl}>
                    <Select>
                    <MenuItem value="Practice">Practice </MenuItem>
                    <MenuItem value="Testing">Testing</MenuItem>
                    <MenuItem value="Performance" >Performance</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    margin="normal">
            <Box m={1}>
                <Button variant="contained" color="primary" size="large">
                    Edit
                </Button>
            </Box>

            </Grid>

        </Grid>
</Box>
)


}