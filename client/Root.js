import React from 'react';
import { Route, Switch, Router } from 'react-router';
import { EditorPage } from './pages';
import History from './modules/History';

const Root = () => (
    <Router history={History}>
        <Switch>
            <Route exact path="/" component={EditorPage} />
        </Switch>
    </Router>
);

export default Root;
