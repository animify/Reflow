import React from 'react';
import PropTypes from 'prop-types';

const Layer = ({ entityId, text, selected, hovering, mouseEnterHandler, mouseLeaveHandler, mouseDownHandler }) => {
    const selectedClass = selected && 'layer selected';
    const hoveringClass = hovering && 'layer hovering';
    const className = selectedClass || hoveringClass || 'layer';

    return (
        <div
            role="presentation"
            className={className}
            onMouseEnter={() => mouseEnterHandler(entityId)}
            onMouseLeave={() => mouseLeaveHandler(entityId)}
            onMouseDown={() => mouseDownHandler(entityId)}
        >
            <span>{text}</span>
        </div >
    );
};

Layer.propTypes = {
    entityId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    hovering: PropTypes.bool.isRequired,
    mouseEnterHandler: PropTypes.func.isRequired,
    mouseLeaveHandler: PropTypes.func.isRequired,
    mouseDownHandler: PropTypes.func.isRequired,
};

export default Layer;
