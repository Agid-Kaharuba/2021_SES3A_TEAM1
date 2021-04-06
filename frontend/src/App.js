import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// IMPORT COMPONENTS
import ManageNavigation from "./components/manageNavigation";
import { ThemeProvider } from "@material-ui/core/styles";

// IMPORT PAGES
import HomePage from "./pages/home/home.js";
import Dashboard from "./pages/dashboard/dashboard.js";
import CreateNewTraining from './pages/supervisorCreateNewTraining/supervisorCreateNewTraining.js';

// import appTheme from "./helpers/appTheme";

// IMPORT CONTEXT
// import { AuthProvider } from "./context/auth";
// import Signout from "./helpers/auth/signout.js";

// function AppProvider(props) {
//   return (
//     <ThemeProvider theme={appTheme}>
//       <AuthProvider>
//         {props.children}
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

function AppRouter(props) {
  return (
    <Switch>
      <Route path="/" 
        exact={true}
        component={HomePage}>
      </Route>

      {/* <Route path="/signup" exact={true}>
        <SignupPage />
      </Route> */}

      {/* <Route path="/signout" exact={true}>
        <Signout />
      </Route> */}

      <Route path="/dashboard" 
        exact={true}
        component={Dashboard}>
      </Route>

      <Route path="/dashboard/create-new-training" 
        exact={true}
        component={CreateNewTraining}>
      </Route>

    </Switch>
  );
}

function App() {
  return (
    <div className="App">
      {/* <AppProvider> */}
        <BrowserRouter>
          <ManageNavigation />
          <div>
            <AppRouter />
          </div>
        </BrowserRouter>
      {/* </AppProvider> */}
    </div>
  );
}

export default App;