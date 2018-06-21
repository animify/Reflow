import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Frame from './Frame';

const mapStateToProps = state => ({
    framableEntities: Object.values(state.entities.present).filter(en => en.selected || en.hovering),
});

const Frames = ({ framableEntities }) => (
    <g id="frames">
        {framableEntities.map(entity => (
            <Frame key={`frame-${entity.id}`} entity={entity} />
        ))}
    </g>
);

Frames.propTypes = {
    framableEntities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Frames);

