import React from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";

export default function SignOut() {
	const { authState, setAuthState } = React.useContext(AuthContext);
  setAuthState(null);
  return <Redirect to="/" />; 
};