import React from 'react';

// IMPORT COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { FormControl } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';

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

export default function SignUp() {
    const classes = useStyles(); //using hook to create classes object
    
    return (
        <Container component = "main" maxWidth = "xs"> {/*set container size*/}
            <CssBaseline/> {/*reset styles to a consistent baseline*/}
            <div className = {classes.paper}>
                <Typography variant = "h3">SIGN UP</Typography>

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

                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    name="confirm password"
                    id="confirm password"
                    type="password" //hide password entered
                    required
                    fullWidth
                />

                <TextField
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    name="First Name"
                    id="First Name"
                    required //must have input to submit the form
                    fullWidth
                />

                <TextField
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    name="Last Name"
                    id="Last Name"
                    required //must have input to submit the form
                    fullWidth
                />

                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required //must have input to submit the form
                    fullWidth
                />

                <FormControl component="fieldset">
                {/* value={value} onChange={handleChange} --event handling, goes in RadioGroup below-- */}
                <RadioGroup aria-label="account type" name="account type" row>
                    <FormControlLabel 
                        value="supervisor" 
                        control={<Radio required={true}/>}
                        label="Supervisor"
                    />
                    <FormControlLabel 
                        value="employee" 
                        control={<Radio required={true}/>}
                        label="Employee"
                    />
                </RadioGroup>
                </FormControl>  

                <Button
                    type="submit"
                    className={classes.submit}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                Confirm
                </Button>

                </form>

            </div>
        </Container>
    );
}