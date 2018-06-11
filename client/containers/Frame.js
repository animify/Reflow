import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
    entities: state.entities,
});

const Entity = ({ entity }) => (
    <g key={entity.id} entity={entity} transform={`translate(${entity.x}, ${entity.y})`}>
        <rect strokeWidth="1.5" stroke={entity.selected ? 'blue' : 'pink'} width={entity.w} height={entity.h} fill="none" />
    </g>
);

Entity.propTypes = {
    entity: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Entity);

