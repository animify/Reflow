import React from 'react';
import Boards from '../boards/Boards';
import Layers from '../layers/Layers';
import Stats from '../layers/Stats';

const LeftPanel = () => (
    <aside id="left-panel">
        <Boards />
        {/* <Layers /> */}
        <Stats />
    </aside>
);

export default LeftPanel;
