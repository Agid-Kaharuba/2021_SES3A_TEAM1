import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import { Box, Grid, Container, Typography, Paper, Avatar, Card, CardActionArea, CardContent, CardMedia, Button, CardActions } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES

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
import MitchGif from '../../images/mitchellvr.gif';
import VanishaGif from '../../images/vanishavr.gif';
import BryanGif from '../../images/bryanvr.gif';
import Matthew from '../../images/profile-photos/matt.jpg';
import Vladimir from '../../images/profile-photos/vlad.jpg';
import BackButton from "../../components/backbutton";

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
        maxWidth: 345,
        height: 345
    },
    margins: {
        marginTop: 2,
    },
});

export default function ProjectOutlinePage() {
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
                <BackButton></BackButton>
            </Grid>
            <Grid container direction="column" alignItems='flex-start'>
                <Container>
                    <Box style={{ fontSize: '24px', fontFamily: 'Roboto', color: "white" }}>
                        <h2>Project Outline</h2>

                        <p>The Virtual Organizational Training Experience is focusing on large corporate organizations that are looking to improve their training experience.
                            The training experience is envisioned to eventually become a platform where companies can create their own XR training modules however, due to the time constraints
                            of Software Studio 3A/3B, we will focus on creating the webapp component of the product, and one specific training scenario which is burger training for now. </p>

                        <p>Our team's objective is:
                            <ul>
                                <li>Create an example of an immersive training experience module in XR </li>
                                <li>Expandable for use as a platform to create training modules</li>
                                <li>Create a webapp that links into the XR modules so users can access them and be assessed </li>
                            </ul>
                        </p>
                    </Box>
                </Container>
            </Grid>
        </Grid>

    )
    //   }
}
