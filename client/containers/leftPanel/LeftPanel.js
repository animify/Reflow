import React from 'react';
import Boards from '../boards/Boards';
import Layers from '../layers/Layers';

const LeftPanel = () => (
    <div className="left-panel">
        <Boards />
        <Layers />
    </div>
);

export default LeftPanel;
