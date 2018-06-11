import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './stylekit/style.styl';
import Root from './Root';

const initialRoot = <Root />;

const r = Component =>
    render(
        <AppContainer>
            {Component}
        </AppContainer>,
        document.getElementById('app')
    );

r(initialRoot);
if (module.hot) module.hot.accept('./Root', () => r(initialRoot));
