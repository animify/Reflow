
import React from 'react';
import Canvas from '../containers/Canvas';
import Boards from '../containers/boards/Boards';
import PropertiesPane from '../containers/properties/PropertiesPane';

const EditorPage = () => (
    <div id="layout">
        <div id="panel">
            <Boards />
            <PropertiesPane />
        </div>
        <Canvas />
    </div>
);

export default EditorPage;
