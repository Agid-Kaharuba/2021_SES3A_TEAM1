import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tasks from "../../components/tasksList/index.js";

import { AuthContext } from "../../context/auth";
import api from "../../helpers/api";

// const useStyles = makeStyles({
//     bold: {
//       fontWeight: 600
//     },
//     underline: {
//       textDecorationLine: 'underline'
//     },
//     italic: {
//       fontStyle: 'italic'
//     },
//     table: {
//       minWidth: 650,
//     },
//   })

  // function createData(name, description, duration, view) {
  //   return {name,description, duration, view};
  // }

  //0 is a placeholder for the view button
  // const rows = [
  //     createData('Task 1', 'Learn the essentials of CPR through an interactive simulation', 10,0),
  //     createData('Task 2', 'Learn how to mitigate safety hazards in the workplace', 20,0),
  //     createData('Task 3', 'Learn the safety terminology', 5,0)
  // ];

  

export default function TasksList() {
    const { authState } = useContext(AuthContext);
    const [tasksState, setTasksState] = useState(undefined);

    const fetchData = async () => {
      const res = await api.task.getAll(authState.token);
      setTasksState(res.data);
    };
  
    useEffect(() => {
      if (tasksState === undefined) {
        fetchData();
      }
    });

    return(
      <Tasks tasksState = {tasksState}/>
    );

}