import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEntity } from '../../selectors';

const makeMapStateToProps = (initialState, initialProps) => {
    return state => ({
        entity: getEntity(state, initialProps),
    });
};

const Frame = ({ entity, scale }) => (
    <g key={entity.id} transform={`translate(${entity.position.x}, ${entity.position.y})`}>
        <rect strokeWidth={1.5 / scale} stroke={'#16abee'} width={entity.size.w} height={entity.size.h} fill="none" />
    </g>
);

Frame.propTypes = {
    scale: PropTypes.number.isRequired,
    entity: PropTypes.object.isRequired,
};

export default connect(
    makeMapStateToProps,
)(Frame);
