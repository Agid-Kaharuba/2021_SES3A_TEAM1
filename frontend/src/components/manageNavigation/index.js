import React from "react";
import { AuthContext } from "../../context/auth";
import Navigation from "../navigation";
import AuthNavigation from "../navigation/auth";

export default class ManageNavigation extends React.Component {
  static contextType = AuthContext;
  
  render() {
    console.log(this.context.authState.authenticated);
    if (this.context.authState.authenticated){
      return <AuthNavigation />
    }
    else {
      return <Navigation />
    }
  
  }
}