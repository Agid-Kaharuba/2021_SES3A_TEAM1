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
  typography: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
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

export default function ChangePasswordDialog(props) {
  const classes = useStyles();
  const { onClose, open, employee, handleChange, saveChanges } = props;

  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return false;
    employee.password = null;
    employee.newPassword = null;
    employee.confirmPassword = null;
    console.log(employee);
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="xs">
      <DialogTitle onClose={handleClose} data-testid="dialogTitle">Change Password</DialogTitle>
      <form onSubmit={(e) => { saveChanges(e); onClose() }} className={classes.changePswForm}>
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
          data-testid="inputNewPsw"
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
          data-testid="inputCfmPsw"
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