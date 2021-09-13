import React, { useState, useEffect, useContext } from "react";
import Users from "../../components/usersList/index.js";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";
import { Container, Typography, Box, Divider, Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

export default function UsersList() {
    const { authState } = useContext(AuthContext);
    const [usersState, setUsersState] = useState(undefined);
    const [search, setSearch] = React.useState("");

    function handleChange(e) {
      const { name, value } = e.target;
      setSearch(value)
      console.log(value)
    }

    function filter(user) {
      const re = new RegExp(search.toLowerCase());
      if (!search) {
        return true
      }
      return re.test(user.staffid) || re.test(user.firstname.toLowerCase()) || re.test(user.lastname.toLowerCase())
    }

    const fetchData = async () => {
      const res = await api.user.all(authState.token);
      setUsersState(res.data);
    };
  
    useEffect(() => {
      if (usersState === undefined) {
        fetchData();
      }
    });

    return(
      <Container maxWidth="md">
         <Box m={5}>
             <Grid container spacing={2} justify="space-between">
                <Grid item>
                  <Typography fontWeight='600' variant='h4'>
                    Users
                  </Typography>
                </Grid>
                <div>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <TextField id="user-search" label="Search" onChange={handleChange}/>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            <Divider variant="fullwidth" />
        </Box>
        <Users usersState = {usersState} setUsersState = {setUsersState} filter = {filter}/>
      </Container>
    );

}