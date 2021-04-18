import {
  registerUser,
  verifyLogin
} from "./auth";

export const API_HOST = "http://localhost:4000";

export default {
    auth: {
      login: verifyLogin,
      register: registerUser
    }
}