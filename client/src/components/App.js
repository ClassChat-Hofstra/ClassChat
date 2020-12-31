import React from "react";
import Home from "./home/home";
import RegisterForm from "./home/RegisterForm";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./dashboard/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/home" component={Dashboard}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
