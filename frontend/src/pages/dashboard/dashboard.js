import React from "react";

// IMPORT COMPONENTS
import { Box, Button, Typography, Divider, TextField, Card, CardContent, CardActions, Paper, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
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

const cardStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CreateNewTrainingPage() {
  const classes = useStyles();
  const cardStyle = cardStyles();
  
  return (
    <div>
      <Box m={5}>
        <Typography className={classes.bold} variant='h4'>
          Dashboard
            </Typography>
        <Divider variant="middle" />
      </Box>

      <Box m={5}>
        <Box mx={5} my={2}>
          <Paper>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>

              </CardContent>
              <CardActions>
                <Button size="small">View Training</Button>
              </CardActions>
            </Card>
          </Paper>
        </Box>
        <Box mx={5} my={2}>
          <Paper>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Word of the Day
                </Typography>

              </CardContent>
              <CardActions>
                <Button size="small">View Training</Button>
              </CardActions>
            </Card>
          </Paper>
        </Box>
        <Box mx={5} my={2} justifyContent='center' display="flex">
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </div>
  )
}