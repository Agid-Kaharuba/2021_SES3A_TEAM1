import React, {useContext, useState} from 'react';
import { Button, Container, Typography, Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import api from '../../helpers/api'
import { AuthContext } from "../../context/auth";
import DoneIcon from '@material-ui/icons/Done';
const useStyles = makeStyles({
  bold: {
    fontWeight: 600
  },
  underline: {
    textDecoration: 'none'
  },
  italic: {
    fontStyle: 'italic'
  },
  table: {
    minWidth: 650
  }
})

function User({user, onDeleteClick, usersState, setUsersState, course} ) {
  const [editState, setEditState] = useState(true);
  const classes = useStyles();
  const { authState } = useContext(AuthContext);
  const handleEdit = async (e, user) => {
    if (!editState) {
        await api.user.update(authState.token, user._id, user);
    }
    setEditState(!editState);
  }
  const handleChange = (e) => {
    const { id, value } = e.target;
    const index = usersState.findIndex(x => x._id == user._id);
    usersState[index][id] = value;
    user[id] = value;
    console.log(usersState[index])
    setUsersState([...usersState])
  }
    return (
      <TableRow key={user.name}>
          <TableCell align="left"> {!editState ? <TextField id="firstname" onChange={handleChange} value={user.firstname}/> : user.firstname}</TableCell>
          <TableCell align="left"> {!editState ? <TextField id="lastname" onChange={handleChange} value={user.lastname}/> : user.lastname}</TableCell>
          <TableCell align="left"> {!editState ? <TextField id="staffid" onChange={handleChange} value={user.staffid}/> : user.staffid}</TableCell>
          {/* Don't know what is going here with the statistics */}
          {course && (<TableCell align="left"><Link className={classes.underline} to={`/dashboard/${course._id}/stats`}>
              <Button variant="outlined" color="secondary">View Statistics</Button>
          </Link></TableCell>)}
          
          <TableCell>
            <IconButton
              color="inherit"
              onClick={(event) => handleEdit(event, user)}
            >
              {editState ? <EditIcon/> : <DoneIcon/>}
            
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              color="inherit"
              onClick={() => onDeleteClick(user)}
            >
              <DeleteIcon/>
            </IconButton>
          </TableCell>
      </TableRow>
    )
    }


export default function Users({course, usersState, setUsersState, handleEdit, editState, filter =()=>true}){
    const classes = useStyles();
    const { authState } = useContext(AuthContext);
    function onDeleteClick(user) {
      api.user.delete(authState.token, user._id)
      setUsersState(usersState.filter((x)=>x._id != user._id))
    }

    function buildUser(user) {
        return (
          <TableRow  key={user.name}>
              <TableCell align="left">{user.firstname}</TableCell>
              <TableCell align="left">{user.lastname}</TableCell>
              <TableCell align="left">{user.staffid}</TableCell>
              {/* Don't know what is going here with the statistics */}
              {/* <TableCell align="left">
              {course && (<Link className={classes.underline} to={`/dashboard/${course._id}/statistics/${user._id}`}>
                  <Button variant="outlined" color="secondary">View Statistics</Button>
              </Link>)}
              </TableCell> */}
              <TableCell>
                <IconButton
                  color="inherit"
                >
                <EditIcon/>
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="inherit"
                  onClick={() => onDeleteClick(user)}
                >
                  <DeleteIcon/>
                </IconButton>
              </TableCell>
          </TableRow>
        )
        }

    
    return(
          <Box data-testid = "buildUserTest" m={5}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.bold} align="left">First Name</TableCell>
                            <TableCell className={classes.bold} align="left">Last Name</TableCell>
                            <TableCell className={classes.bold} align="left">Staff ID</TableCell>
                            {/* <TableCell align="right"></TableCell> */}
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersState && usersState.filter(filter).map((user) => {
                            return (<User course={course} user={user} onDeleteClick={onDeleteClick} setUsersState={setUsersState} usersState={usersState}/>)
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
          </Box>
        );
}
