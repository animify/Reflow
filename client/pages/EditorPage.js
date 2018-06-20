
import React from 'react';
import Canvas from '../containers/Canvas';
import Boards from '../containers/Boards';

const EditorPage = () => (
    <div id="layout">
        <div id="panel">
            <Boards />
        </div>
        <Canvas />
    </div>
);

export default EditorPage;
