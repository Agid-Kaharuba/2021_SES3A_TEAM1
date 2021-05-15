import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Button, Typography } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES
import VRLogo from '../../images/vr-glasses-white.png';

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