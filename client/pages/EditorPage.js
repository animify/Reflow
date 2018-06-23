
import React from 'react';
import Canvas from '../containers/Canvas';
import PropertiesPane from '../containers/properties/PropertiesPane';
import Toolbar from '../containers/toolbar/Toolbar';
import LeftPanel from '../containers/leftPanel/LeftPanel';

const EditorPage = () => (
    <div id="layout">
        <div id="panel">
            <LeftPanel />
            <Toolbar />
            <PropertiesPane />
        </div>
        <Canvas />
    </div>
);

export default EditorPage;
