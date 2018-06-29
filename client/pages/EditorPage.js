
import React from 'react';
import { Provider } from 'react-redux';
import Document from '../containers/Document';
import store from '../store';

const EditorPage = () => (
    <Provider store={store}>
        <Document />
    </Provider >
);

export default EditorPage;
