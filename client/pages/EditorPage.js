
import React, { Fragment } from 'react';
import Canvas from '../containers/Canvas';
import PropertiesPane from '../containers/properties/PropertiesPane';
import Toolbar from '../containers/toolbar/Toolbar';
import LeftPanel from '../containers/leftPanel/LeftPanel';

const EditorPage = () => (
    <Fragment>
        <Toolbar />
        <LeftPanel />
        <Canvas />
        <PropertiesPane />
    </Fragment>
);

export default EditorPage;
