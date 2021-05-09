import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Container, Button, Typography, Paper, Avatar } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";

// IMPORT IMAGES
import VRLogo from '../../images/vr-glasses-white.png';
import bbt from '../../images/bbt.jpg';
import burger from '../../images/burger2.jpg';
import pizza from '../../images/pizza2.jpg';
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
  const history = useHistory();
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
            style={{ minHeight: ' calc(100vh - 64px)', backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)"}}>
              
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
              <Button variant='contained' color='primary' onClick={()=>history.push('/login')}>
                Get Started!
              </Button>
            </Grid>
            </Grid>
            )

}