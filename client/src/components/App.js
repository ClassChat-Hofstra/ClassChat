import React from "react";
import Home from "./home/home";
import RegisterForm from "./home/RegisterForm";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <PrivateRoute path="/home" component={Dashboard}/>
          <PrivateRoute path="/update-profile" component={UpdateProfile}/>
          <Route pash="/forgot-password" component={ForgotPassword}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
