import React from "react";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import {
  Box,
  Grid,
  Container,
  Typography,
  Paper,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  CardActions,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

// IMPORT IMAGES

import Andrew from "../../images/profile-photos/andrew-do.jpg";
import Vanisha from "../../images/profile-photos/vanisha-singh.png";
import Andy from "../../images/profile-photos/andy-le.jpg";
import Agid from "../../images/profile-photos/agid-kaharuba.png";
import Mitchell from "../../images/profile-photos/mitchell-murphy.png";
import Herrick from "../../images/profile-photos/herrick-feng.jpg";
import Bryan from "../../images/profile-photos/bryan-dinh.png";
import Kelvin from "../../images/profile-photos/kelvin-luong.jpg";
import Calvin from "../../images/profile-photos/calvin-dong.jpg";
import Brendon from "../../images/profile-photos/brendon-tong.png";
import Lakshva from "../../images/profile-photos/lakshva-sharma.jpg";
import Anna from "../../images/profile-photos/anna.bmp";
import MitchGif from "../../images/mitchellvr.gif";
import VanishaGif from "../../images/vanishavr.gif";
import BryanGif from "../../images/bryanvr.gif";
import Matthew from "../../images/profile-photos/matt.jpg";
import Vladimir from "../../images/profile-photos/vlad.jpg";
import Aaron from "../../images/profile-photos/aaron.jpg";
import BackButton from "../../components/backbutton";

// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
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
    height: 345,
  },
  margins: {
    marginTop: 2,
  },
});

export default function TheTeamPage() {
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
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(45deg, #662D8C  10%, #ED1E79)",
      }}
    >
      <Grid item>
        <br></br>
        <WhiteTextTypography variant="h3">
          <Box style={{ fontWeight: "600", letterSpacing: 6 }} display="inline">
            {" "}
            Team Structure
          </Box>
        </WhiteTextTypography>
      </Grid>
      <Grid container direction="column" alignItems="flex-start">
        <Container>
          <Box mt={6}>
            <Grid
              container
              spacing={4}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Anna} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Na Tian
                  </WhiteTextTypography>
                  <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Vanisha} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Vanisha Singh
                  </WhiteTextTypography>
                  <WhiteTextTypography>UI/UX Design Lead</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Andy} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Andy Lee
                  </WhiteTextTypography>
                  <WhiteTextTypography>
                    Unity Dev / Scrum Master
                  </WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Matthew} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Matthew Barrett
                  </WhiteTextTypography>
                  <WhiteTextTypography>Unity Lead</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Mitchell} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Mitchell Murphy
                  </WhiteTextTypography>
                  <WhiteTextTypography>Back-End Lead</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Herrick} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Herrick Feng
                  </WhiteTextTypography>
                  <WhiteTextTypography>Front-End Lead</WhiteTextTypography>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box m={6}>
            <Grid
              container
              spacing={4}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Bryan} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Bryan Dinh
                  </WhiteTextTypography>
                  <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Kelvin} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Kelvin Luong
                  </WhiteTextTypography>
                  <WhiteTextTypography>Front-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Brendon} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Brendon Tong
                  </WhiteTextTypography>
                  <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Calvin} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Calvin Dong
                  </WhiteTextTypography>
                  <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Lakshva} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Lakshya Sharma
                  </WhiteTextTypography>
                  <WhiteTextTypography>Back-End Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Vladimir} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Vladimir Poshevelya
                  </WhiteTextTypography>
                  <WhiteTextTypography>Unity Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Agid} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    Agid Kaharuba
                  </WhiteTextTypography>
                  <WhiteTextTypography>Unity Developer</WhiteTextTypography>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Avatar src={Aaron} className={profiles.large} />
                  <WhiteTextTypography
                    style={{ fontWeight: "600", fontSize: "1.2rem" }}
                  >
                    The Aaron
                  </WhiteTextTypography>
                  <WhiteTextTypography>Tech Stack Carry</WhiteTextTypography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
      <Grid item>
        <BackButton />
      </Grid>
    </Grid>
  );
  //   }
}
