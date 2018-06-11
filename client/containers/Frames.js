import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Frame from './Frame';

const mapStateToProps = state => ({
    entities: state.entities,
});

const Frames = ({ entities }) => (
    <Fragment>
        <g id="frames">
            {
                entities.filter(en => en.selected || en.hovering).map(entity => (
                    <Frame key={`frame-${entity.id}`} entity={entity} />
                ))
            }
        </g>
    </Fragment>
);

Frames.propTypes = {
    entities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Frames);

