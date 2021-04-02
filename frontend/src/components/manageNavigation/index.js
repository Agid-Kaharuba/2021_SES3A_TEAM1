import React from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/auth";
import Navigation from "../navigation";
// import StudentNavigation from "../studentNavigation";
// import TeacherNavigation from "../teacherNavigation";

export default function ManageNavigation() {
  // const { authState, setAuthState } = React.useContext(AuthContext);

  // if (authState.authenticated) {
  //   if (
  //     authState.user.claims !== undefined &&
  //     (authState.user.claims.admin || authState.user.claims.teacher)
  //   ) {
  //     return (<TeacherNavigation/>)
  //   } else {
  //     // If the authenticated user does not have a teacher
  //     // claim assume its a assume they are a student user
  //     return (<StudentNavigation/>)
  //   }
  // } else {
  //   // Display unauthenticated guest nav for everyone
    return <Navigation />
  // }
}