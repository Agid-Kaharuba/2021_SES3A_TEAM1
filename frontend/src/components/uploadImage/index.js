
import React, { useState, useContext } from "react";
import { Button, TextField, Container, Typography, IconButton, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
import BackButton from "../backbutton";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../helpers/api'
import { AuthContext } from "../../context/auth";


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
    height: 150,
    width: 150,
    margin: theme.spacing(2),
  },
  imageUpload: {
    display: "none",
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



function UploadImage(props) {
  const { authState } = useContext(AuthContext);
  const [img, setImg] = useState(undefined);

  const classes = useStyles();

  const imageUploader = React.useRef(null);

  const handleImageUpload = async e => {
    try {
      const file = e.target.files[0];
      let fileSend = new FormData();
      const fileName = authState.user.username;
      fileSend.append('file', file, fileName)
      const res = await api.user.upload(fileSend);
      setImg(await api.user.download(authState.user.username))
    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      {/*Accepting only files with image type*/}
      <input type="file" id="input" accept="image/*" onChange={handleImageUpload} ref={imageUploader} className={classes.imageUpload} />
      <div className={classes.profileImg}>
        <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/320px-Google_%22G%22_Logo.svg.png?1629536456659" alt="profile image" />
      </div>
      <div>
        <Button onClick={() => imageUploader.current.click()} variant="outlined" color="secondary">Upload Image</Button>
      </div>
    </div>
  )
}

export default function PlaceholderImage(props) {
  const classes = useStyles();

  return (
    <div maxWidth="md">
      <div className={classes.container}>
        <UploadImage {...props} />
      </div>
    </div>
  )
}