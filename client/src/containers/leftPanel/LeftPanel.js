import React from 'react';
import Boards from '../boards/Boards';
import Layers from '../layers/Layers';
import Stats from '../layers/Stats';
import Tests from '../layers/Tests';

const LeftPanel = () => (
    <aside id="left-panel">
        <Boards />
        <Stats />
        <Tests />
        {/* <Layers /> */}
    </aside>
);

export default LeftPanel;
