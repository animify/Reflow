import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import { EditorPage } from './pages';
import { PageRoutes } from './store/actions';
import History from './modules/History';

const Root = () => (
    <Provider store={store}>
        <ConnectedRouter history={History}>
            <Switch>
                <Route path="/" component={EditorPage} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

export default Root;
