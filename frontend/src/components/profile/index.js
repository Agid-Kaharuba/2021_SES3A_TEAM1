import React from "react";
import { Button, TextField, Container, Typography, IconButton, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import BackButton from "../backbutton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  changePswForm: {
    padding: "16px 24px",

  },
  textField: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  typography: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0.5)
  },
  profileImg: {
    position: "relative",
    alignSelf: "start"
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
    margin: theme.spacing(2),
  },
  uploadBtn: {
    position: "absolute",
    bottom: "0px",
    right: "0px"
  },
  imageUpload: {
    display: "none",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    columnGap: "2vw"
  },
  name: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    columnGap: "2vw",
  },
  labelField: {
    marginTop: theme.spacing(3),
  },
  saveBtn: {
    marginTop: "32px",
    textAlign: "center"
  }
}));


function DialogTitle(props) {
  const classes = useStyles();
  const { children, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

function ChangePasswordDialog(props) {
  const classes = useStyles();
  const { onClose, open, employee, handleChange, saveChanges } = props;

  const handleClose = () => {
    employee.password = null;
    employee.newPassword = null;
    employee.confirmPassword = null;
    console.log(employee);
    onClose();
  };

  return (
    <Dialog data-testid = "ChangePasswordDialogTest" onClose={handleClose} open={open} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="xs">
      <DialogTitle onClose={handleClose}>Change Password</DialogTitle>
      <form onSubmit={saveChanges} className={classes.changePswForm}>
        <Typography variant="subtitle1" className={classes.typography}>Current Password*</Typography>
        <TextField
          id="outlined-password-input"
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
          value={employee.password}
          variant="outlined"
          required
          fullWidth
          className={classes.password}
        />
        <Typography variant="subtitle1" className={classes.typography}>New Password*</Typography>
        <TextField
          id="outlined-password-input"
          type="password"
          name="newPassword"
          autoComplete="current-password"
          onChange={handleChange}
          value={employee.newPassword}
          variant="outlined"
          fullWidth
          required
          className={classes.password}
        />
        <Typography variant="subtitle1" className={classes.typography}>Confirm Password*</Typography>
        <TextField
          id="outlined-password-input"
          type="password"
          name="confirmPassword"
          autoComplete="current-password"
          onChange={handleChange}
          value={employee.confirmPassword}
          variant="outlined"
          fullWidth
          required
          error={(employee.confirmPassword !== undefined) && (employee.newPassword !== employee.confirmPassword)}
          helperText={(employee.confirmPassword !== undefined) && (employee.newPassword !== employee.confirmPassword) ? 'Password do not match' : ''}
          className={classes.password}
        />
        <div className={classes.saveBtn}>
          <Button variant="contained" color="secondary" className={classes.button} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function ProfilePicture(props) {
  const classes = useStyles();
  // TODO: I dont know what these are for
  // There were declared before this component was pulled from being hardcoded in a page
  // Just propping them in for now.
  const { imageUploader, handleImageUpload } = props;

  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div data-testid = "ProfilePictureTest" >
      {/*Accepting only files with image type*/}
      <input type="file" id="input" accept="image/*" onChange={handleImageUpload} ref={imageUploader} className={classes.imageUpload} />
      <div className={classes.profileImg}>
        <img className={classes.image} src={props.image.data} alt="profile image" />
        <IconButton onClick={() => imageUploader.current.click()} className={classes.uploadBtn}><EditIcon fontSize="large" /></IconButton>
      </div>
      <div>
        <Button onClick={handleDialogOpen} variant="outlined" color="secondary" className={classes.changePsw}>Change Password</Button>
        <ChangePasswordDialog open={open} onClose={handleClose} {...props}></ChangePasswordDialog>
      </div>
    </div>
  )
}

export default function Profile(props) {
  const classes = useStyles();
  const { employee, handleChange, saveChanges } = props;

  return (
    <Container data-testid = "ProfileTest" maxWidth="md">
      <Typography variant="h4" className={classes.heading}>My Profile</Typography>
      <div className={classes.container}>
        <ProfilePicture {...props} />
        <form>
          <div className={classes.name}>
            <div className={classes.labelField}>
              <Typography variant="subtitle1" className={classes.typography}>First Name</Typography>
              <TextField
                id="outlined-required"
                name="firstname"
                onChange={handleChange}
                value={employee.firstname}
                variant="outlined"
                fullWidth
                className={classes.textField}
              // label="First Name"
              />
            </div>
            <div className={classes.labelField}>
              <Typography variant="subtitle1" className={classes.typography}>Last Name</Typography>
              <TextField
                id="outlined-required"
                name="lastname"
                onChange={handleChange}
                value={employee.lastname}
                variant="outlined"
                fullWidth
                className={classes.textField}
              />
            </div>
          </div>
          <div className={classes.labelField}>
            <Typography variant="subtitle1" className={classes.typography}>Staff ID</Typography>
            <TextField
              id="outlined-required"
              name="staffid"
              onChange={handleChange}
              value={employee.staffid}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </div>
          <div className={classes.labelField}>
            <Typography variant="subtitle1" className={classes.typography}>Email</Typography>
            <TextField
              id="outlined-required"
              name="email"
              onChange={handleChange}
              value={employee.email}
              variant="outlined"
              fullWidth
              className={classes.textField}
            />
          </div>
        </form>
      </div>
      <div className={classes.saveBtn}>
        <Button variant="contained" color="secondary" className={classes.button} type="submit" onClick={saveChanges}>
          Save
        </Button>
      </div>
    </Container>
  )
}