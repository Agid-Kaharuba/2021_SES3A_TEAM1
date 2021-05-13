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
import AboutUs from "./pages/aboutus/aboutus.js";
import ViewTask from "./pages/viewtask/viewtask.js";
import SignUp from "./pages/signup/signup.js";
import TaskList from "./pages/taskslist/taskslist.js";
import UserList from "./pages/userslist/userslist.js";
import CreateTaskGlobal from "./pages/createtask/createtaskglobal.js";
import Statistics from "./pages/statistics/statistics.js";
import CreateNewTask from "./pages/createtask/createtask.js";
import RecipesList from "./pages/recipesList/recipesList.js";
import CreateRecipe from "./pages/createRecipe/createRecipe.js";
import ViewRecipe from "./pages/viewRecipe/viewRecipe.js";

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

      <PrivateRoute path="/user" 
        exact={true}
        component={UserList}>
      </PrivateRoute>

      <Route path="/taskslist" 
        exact={true}
        component={TaskList}>
      </Route>

      <Route path="/taskslist/createtask" 
        exact={true}
        component={CreateTaskGlobal}>
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

      <Route path="/task"
        exact={true}
        component={TasksList}>
      </Route>

      <Route path="/task/:taskId"
        exact={true}
        component={ViewTask}>
      </Route>

      <Route path="/recipelist/:recipeId"
        exact={true}
        component={ViewRecipe}>
      </Route>

      <Route path="/aboutus"
        exact={true}
        component={AboutUs}>
      </Route>

      <Route path="/statistics"
        exact={true}
        component={Statistics}>
      </Route>
    
      <Route path="/createtask"
        exact={true}
        component={CreateNewTask}>
      </Route>

      <Route path="/recipeslist"
        exact={true}
        component={RecipesList}>
      </Route>

      <Route path="/recipeslist/createrecipe"
        exact={true}
        component={CreateRecipe}>
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