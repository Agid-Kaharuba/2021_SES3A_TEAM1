import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//STYLES
import {ThemeProvider} from "@material-ui/core/styles";
import Theme from './theme'

// IMPORT COMPONENTS
import ManageNavigation from "./components/manageNavigation";
import PrivateRoute from "./components/PrivateRoute";
import SignOut from "./components/signout";

// IMPORT PAGES
import HomePage from "./pages/home/home.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import CreateNewCourse from './pages/supervisor/CreateCourse';
import EmployeeProfile from "./pages/profile/employeeProfile";
import LogIn from "./pages/login/login.js";
import SignUp from "./pages/signup/signup.js";
import taskList from "./pages/taskslist/taskslist.js";
import Statistics from "./pages/statistics/Statistics.js";
import CreateNewTask from "./pages/createtask/createtask.js";

// import appTheme from "./helpers/appTheme";

// IMPORT CONTEXTS
import { AuthProvider } from "./context/auth";
import TasksList from './pages/taskslist/taskslist';
// import Signout from "./helpers/auth/signout.js";

function AppProvider(props) {
  return (
    // <ThemeProvider theme={appTheme}>
    <AuthProvider>
      {props.children}
    </AuthProvider>
    // </ThemeProvider>
  );
}

function AppRouter(props) {
  return (
    <Switch>
      <PrivateRoute path="/dashboard"
        exact={true}
        component={Dashboard} />

      <PrivateRoute path="/dashboard/create-course"
        exact={true}
        component={CreateNewCourse} />

      <PrivateRoute path="/profile"
        exact={true}
        component={EmployeeProfile} />

      <Route path="/dashboard/taskList" 
        exact={true}
        component={taskList}>
      </Route>

      <Route path="/statistics" 
        exact={true}
        component={Statistics}>
      </Route>

      <Route path="/login"
        exact={true}
        component={LogIn}>
      </Route>

      <Route path="/signup"
        exact={true}
        component={SignUp}>
      </Route>

      <Route path="/signout"
        exact={true}
        component={SignOut}>
      </Route>

      <Route path="/taskslist"
        exact={true}
        component={TasksList}>
      </Route>


      <Route path="/statistics"
        exact={true}
        component={Statistics}>
      </Route>
    
      <Route path="/createtask"
        exact={true}
        component={CreateNewTask}>
      </Route>

      <Route path="/"
        exact={true}
        component={HomePage}>
      </Route>
    </Switch>
  );
}

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <AppProvider>
          <BrowserRouter>
            <ManageNavigation />
            <div>
              <AppRouter />
            </div>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;