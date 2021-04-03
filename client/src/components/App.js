import React from "react";
import Home from "./home/home";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./dashboard/Layout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import EditCourses from "./edit-courses/EditCourses";
import io from "socket.io-client";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PublicRoute path="/" component={Home} exact />
          <PrivateRoute path="/edit-courses" component={EditCourses} exact />
          <PrivateRoute
            path="/update-profile"
            component={UpdateProfile}
            exact
          />
          <PrivateRoute path="/home" component={Dashboard} exact />
          <PublicRoute
            path="/forgot-password"
            component={ForgotPassword}
            exact
          />
          <PublicRoute component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
