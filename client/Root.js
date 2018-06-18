import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import { EditorPage } from './pages';
import History from './modules/History';

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={History}>
            <Switch>
                <Route exact path="/" component={EditorPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default Root;
