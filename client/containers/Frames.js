import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Frame from './Frame';

const mapStateToProps = state => ({
    entities: state.entities.present,
});

const Frames = ({ entities }) => (
    <Fragment>
        <g id="frames">
            {
                Object.values(entities).filter(en => en.selected || en.hovering).map(entity => (
                    <Frame key={`frame-${entity.id}`} entity={entity} />
                ))
            }
        </g>
    </Fragment>
);

Frames.propTypes = {
    entities: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Frames);

