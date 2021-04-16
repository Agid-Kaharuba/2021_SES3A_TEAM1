// import React from "react";
// import Input from '@material-ui/core/Input';
// import Button from "@material-ui/core/Button"
// import LinearProgress from "@material-ui/core/LinearProgress"
// import CircularProgress from "@material-ui/core/CircularProgress"
// import api from "../../helpers/api/index";
// import FormData from 'form-data';
// import { AuthContext } from "../../context/auth";

// export default function UploadImageForm(props) {
//   const { authState } = React.useContext(AuthContext);

//   const handleUpload = async (event) => {
//     try {
//       let file = event.target.files[0]
//       let fileSend = new FormData()
//       const fileName = authState.user.uid
//       fileSend.append('image', file, fileName)
//       await api.user.upload(authState.user.idToken, authState.user.uid, fileSend);
//       props.setState(undefined)
//     }
//     catch (error) {
//       console.log("did an oopsie", error.response)
//     }
//   }

//   const uploadButton = () => {
//     return (<Button variant="contained" component="label" color='secondary'>
//       Upload Image
//       <Input type="file" name="image-upload" id="input" accept="image/*" style={{ display: "none" }} onChange={handleUpload} disableUnderline />
//     </Button>
//     )
//   }

//   return (
//     <div>
//       {uploadButton()}
//     </div>
//   );
// }
