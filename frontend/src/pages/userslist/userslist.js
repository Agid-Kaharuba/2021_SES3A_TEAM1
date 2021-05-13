import React, { useState, useEffect, useContext } from "react";
import Users from "../../components/usersList/index.js";
import { Box, Button, Typography, Divider, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

export default function UsersList() {
    const { authState } = useContext(AuthContext);
    const [usersState, setUsersState] = useState(undefined);

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
      <Users usersState = {usersState}/>
    );

}