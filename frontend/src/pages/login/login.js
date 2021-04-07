import React from 'react';

// IMPORT COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

//creating the react hook
const useStyles = makeStyles((theme) => ({
    //button setup
    submit: {
        margin: theme.spacing(4, 0, 1), //top space, LR align, bottom space
    },
    //form setup
    form: {
        marginTop: theme.spacing(2), //top space
        width: '100%', //form width
    },
    //setup for the overall page
    paper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(7),
    },
}));

export default function LogIn() {
    const classes = useStyles(); //using hook to create classes object
    let history = useHistory();

    const signupClick = () => {
        history.push('/signup')
    }
    
    return (
        <Container component = "main" maxWidth = "xs"> {/*set container size*/}
            <CssBaseline/> {/*reset styles to a consistent baseline*/}
            <div className = {classes.paper}>
                <Typography variant = "h3">LOGIN</Typography>

                <form className = {classes.form} noValidate>
                <TextField
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    name="username"
                    id="username"
                    required //must have input to submit the form
                    fullWidth
                />
                <Link href="#" variant="body2">Forgot username?</Link>
                
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    name="password"
                    id="password"
                    type="password" //hide password entered
                    required
                    fullWidth
                />
                <Link href="#" variant="body2">Forgot password?</Link>

                <Button
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                Login
                </Button>

                <Button
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={signupClick}
                >
                Sign Up
                </Button>
                </form>

            </div>
        </Container>
    );
}