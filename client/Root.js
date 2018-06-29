import React from 'react';
import { Route, Router, Switch } from 'react-router';
import createHistory from 'history/createBrowserHistory';
import EditorPage from './src/pages/EditorPage';

const History = createHistory();
const Root = () => (
    <Router history={History}>
        <Switch>
            <Route exact path="/" component={EditorPage} />
        </Switch>
    </Router>
);

export default Root;
