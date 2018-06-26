import React from 'react';
import Boards from '../boards/Boards';
import Layers from '../layers/Layers';

const LeftPanel = () => (
    <aside id="left-panel">
        <Boards />
        <Layers />
    </aside>
);

export default LeftPanel;
