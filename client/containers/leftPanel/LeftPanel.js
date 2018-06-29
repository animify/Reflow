import React from 'react';
import Boards from '../boards/Boards';
import Stats from '../layers/Stats';

const LeftPanel = () => (
    <aside id="left-panel">
        <Boards />
        <Stats />
    </aside>
);

export default LeftPanel;
