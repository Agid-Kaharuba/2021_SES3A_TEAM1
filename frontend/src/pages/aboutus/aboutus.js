import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Container, Typography, Paper, Avatar, Card, CardActionArea, CardContent, CardMedia, Button, CardActions } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES


import ProjectOutlineImage from '../../images/projuout.jpg';
import TeamCommunicationImage from '../../images/teamcom.jpg';
import VrImage from '../../images/vrthingy.jpg';
import TeamImage from '../../images/teams.jpg';


// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  }
})(Typography);

const profileStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const useStyles = makeStyles({
  media: {
    height: 180,
  },
  root: {
    maxWidth: 300,
    height: 300
  },
  margins: {
    gridGap: 10,
  },
  heading:{
    color:  "#FFFFFF",
  }
});

export default function AboutUsPage() {
  const history = useHistory();
  //   const { authState, setAuthState } = React.useContext(AuthContext);
  const profiles = profileStyles();
  const classes = useStyles();
  //   if (authState.authenticated) {
  //     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
  //   } else {
  return (
    // Orignial Gradient linear-gradient(45deg, #662D8C  10%, #ED1E79)
    <Grid
      container
      spacing={2}
      direction='column'
      alignItems='center'
      justify='center'
      style={{ minHeight: '100vh', backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)" }}>
      <Grid item>
        <br></br>
        <WhiteTextTypography variant='h3'>
          <Box style={{ fontWeight: '600', letterSpacing: 6 }} display='inline'> About Us</Box>
        </WhiteTextTypography>
      </Grid>
      <Grid container direction="column" alignItems='flex-start'>
        <Container>
          <h2 className={classes.heading}>Our Storyy</h2>
          <WhiteTextTypography>What is Lorem Ipsum?
          Our Team came up with the revolutionary idea that would transform the training sector completely with the help of Virtual Reality also the Technology of Future. Our team earlier this year came up with a great solution on how to train users in different industries. Our technology would allow users to look around themselves, walk up to close computer-generated objects, and interact with different items from the comfort of their home.
          </WhiteTextTypography>
          <Grid container direction="row" alignItems='flex-start' className={classes.margins} >
            <Card className={classes.root} onClick={() => history.push('/aboutus/projectoutline')}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={ProjectOutlineImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Project Outline
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    The aim of the project is to create training in VR.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.root} onClick={() => history.push('/aboutus/teamcommunication')}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={TeamCommunicationImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Team Communication
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Information of how our team communicate between each other.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.root} onClick={() => history.push('/aboutus/vrexperience')}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={VrImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    VR experiences
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Some experiences of clients using the our application.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.root} onClick={() => history.push('/aboutus/theteam')}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={TeamImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    The Team
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Our team consist of three division: Unity team, Backend team & Frontend team.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Container>
      </Grid>

    </Grid>

  )
  //   }
}
