import React from 'react';
import Home from './components/home/home';

import {Route, Switch } from 'react-router-dom';

function App() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
        </Switch>
        
    );
}

export default App;