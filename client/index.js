import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';
import './stylekit/stylekit.styl';

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
