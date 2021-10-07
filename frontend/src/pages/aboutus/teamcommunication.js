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

export default function TeamCommunicationPage() {
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
                    <Box style={{ fontWeight: '600', letterSpacing: 6 }} display='inline'> Team Communication</Box>
                </WhiteTextTypography>
            </Grid>
            <Grid container direction="column" alignItems='flex-start'>
                <Container>
                    <Box style={{ fontSize: '24px', fontFamily: 'Roboto', color: "white" }}>
                        <p>
                            All tasks were split and assigned to team members on Trello so that it was always transparent which tasks were being worked on, have been completed or still required additional progress.
                        </p>
                        <p>
                            Microsoft Teams was the main form of communication used for collaborating and holding meetings, while Facebook Messenger was used for general communication.
                            The code for this project can be found at our <a href="https://github.com/Agid-Kaharuba/2021_SES3A_TEAM1">GitHub repository</a>.
                        </p>

                    </Box>
                </Container>
            </Grid>
            <Grid item>
                <BackButton/>
            </Grid>
        </Grid>

    )
    //   }
}

