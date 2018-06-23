import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Frame from './Frame';

const mapStateToProps = state => ({
    framableEntities: Object.values(state.doc.present.entities).filter(en => en.selected || en.hovering),
    scale: state.canvas.scale
});

const Frames = ({ framableEntities, scale }) => (
    <g id="frames">
        {framableEntities.map(entity => (
            <Frame key={`frame-${entity.id}`} entity={entity} scale={scale} />
        ))}
    </g>
);

Frames.propTypes = {
    scale: PropTypes.number.isRequired,
    framableEntities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Frames);

