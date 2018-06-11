import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mouseEnter, mouseLeave, mouseClick } from '../store/actions';

const mapStateToProps = state => ({
    entities: state.entities,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(mouseEnter(ownProps.entity)),
    onMouseLeave: () => dispatch(mouseLeave(ownProps.entity)),
    onClick: () => dispatch(mouseClick(ownProps.entity))
});

const Entity = ({ entity, onMouseEnter, onMouseLeave, onClick }) => (
    <g key={entity.id} entity={entity} transform={`translate(${entity.x}, ${entity.y})`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} >
        <image width={entity.w} height={entity.h} xlinkHref={entity.image} />
    </g>
);

Entity.propTypes = {
    entity: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entity);

