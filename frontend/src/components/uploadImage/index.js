
import React from "react";
import { Button, TextField, Container, Typography, IconButton, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
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
    <Dialog onClose={handleClose} open={open} disableBackdropClick disableEscapeKeyDown fullWidth="true" maxWidth="xs">
      <DialogTitle onClose={handleClose}>Choose a Image</DialogTitle>
      <form onSubmit={saveChanges} className={classes.changePswForm}>
        <Grid>
          <div>
            <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png?1629536456659" alt="profile image" />
          </div>
        </Grid>
        <div className={classes.saveBtn}>
          <Button variant="contained" color="secondary" className={classes.button} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function UploadImage(props) {
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
    <div>
      {/*Accepting only files with image type*/}
      <input type="file" id="input" accept="image/*" onChange={handleImageUpload} ref={imageUploader} className={classes.imageUpload} />
      <div className={classes.profileImg}>
        <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png?1629536456659" alt="profile image" />
      </div>
      <div>
        <Button onClick={handleDialogOpen} variant="outlined" color="secondary" className={classes.changePsw}>Upload Image</Button>
        <ChangePasswordDialog open={open} onClose={handleClose} {...props}></ChangePasswordDialog>
      </div>
    </div>
  )
}

export default function PlaceholderImage(props) {
  const classes = useStyles();
  const { employee, handleChange, saveChanges } = props;

  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        <UploadImage {...props} />
      </div>
    </Container>
  )
}