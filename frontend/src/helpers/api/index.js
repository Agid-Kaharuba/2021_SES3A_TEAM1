export const API_HOST = "http://localhost:4000";
import {
    registerUser,
    verifyLogin
  } from "./auth";

export default {
    auth: {
      login: verifyLogin,
    }
}