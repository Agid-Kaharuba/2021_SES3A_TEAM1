import React from "react";

// IMPORT COMPONENTS
import { Box, Grid, Button, Typography, Paper, Avatar } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES
import VRLogo from '../../images/vr-glasses-white.png';
import Andrew from '../../images/profile-photos/andrew-do.jpg';
import Vanisha from '../../images/profile-photos/vanisha-singh.png';
import Andy from '../../images/profile-photos/andy-le.jpg';
import Agid from '../../images/profile-photos/agid-kaharuba.png';
import Mitchell from '../../images/profile-photos/mitchell-murphy.png';
import Herrick from '../../images/profile-photos/herrick-feng.jpg';
import Bryan from '../../images/profile-photos/bryan-dinh.png';
import Kelvin from '../../images/profile-photos/kelvin-luong.jpg';
import Calvin from '../../images/profile-photos/calvin-dong.jpg';
import Brendon from '../../images/profile-photos/brendon-tong.png';
import Lakshva from '../../images/profile-photos/lakshva-sharma.jpg';

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);

const profileStyles = makeStyles((theme) =>  ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function HomePage() {
//   const { authState, setAuthState } = React.useContext(AuthContext);
  const profiles = profileStyles();
//   if (authState.authenticated) {
//     return authState.user.claims.teacher ? <Redirect to="/teacher/subjectList" />: <Redirect to="/student/dashboard" />; 
//   } else {
    return (

        <Grid 
            container
            spacing={2}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh', backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)"}}>
              
            <Grid item>
              <img src={VRLogo} width='200' height='200'/>
            </Grid>  
            <Grid item>
              <WhiteTextTypography variant='h3'>
                <Box style={{fontWeight: '600', letterSpacing:6}} display='inline'> XR TRAINING EXPERIENCE</Box>
              </WhiteTextTypography>
            </Grid>

            <Grid item>
              <WhiteTextTypography variant='h5'>
                <Box display='inline'>
                  A virtual and augmented reality training experience.
                </Box>
              </WhiteTextTypography>
            </Grid>

            <Grid item>
              <Button variant='contained' color='primary'>
                Get Started!
              </Button>
            </Grid>



            <Box mt={6}>
              <Grid
                container
                spacing={4}
                direction='row'
                alignItems='center'
                justify='center'>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Andrew} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem' }}>Andrew Do</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Co-Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Vanisha} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Vanisha Singh</WhiteTextTypography>
                    <WhiteTextTypography>UI/UX Design Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Andy} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Andy Le</WhiteTextTypography>
                    <WhiteTextTypography>Scrum Master</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Agid} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Agid Kaharuba</WhiteTextTypography>
                    <WhiteTextTypography>Unity/XR Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Mitchell} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Mitchell Murphy</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Herrick} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Herrick Feng</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Co-Lead</WhiteTextTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Box m={6}>
              <Grid
                container
                spacing={4}
                direction='row'
                alignItems='center'
                justify='center'>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Bryan} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Bryan Dinh</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Kelvin} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Kelvin Luong</WhiteTextTypography>
                    <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Brendon} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Brendon Tong</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Calvin} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Calvin Dong</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid 
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'>
                    <Avatar src={Lakshva} className={profiles.large}/>
                    <WhiteTextTypography style={{fontWeight: '600', fontSize: '1.2rem'}}>Lakshva Sharma</WhiteTextTypography>
                    <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            

        </Grid>

    )
//   }
}