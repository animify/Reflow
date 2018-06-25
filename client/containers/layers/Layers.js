import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layer from './Layer';
import { toggleHoverEntity, toggleSelectEntity } from '../../store/actions';
import store from '../../store';

const mapStateToProps = state => ({
    entitiesOrder: state.doc.present.entitiesOrder,
    selectedEntities: state.doc.present.selected,
    hoveringEntity: state.doc.present.hovering,
});

const mapDispatchToProps = dispatch => ({
    onMouseEnter: entityId => dispatch(toggleHoverEntity(entityId, true)),
    onMouseLeave: entityId => dispatch(toggleHoverEntity(entityId, false)),
    onMouseDown: entityId => dispatch(toggleSelectEntity(entityId, true, true)),
});

const Layers = ({ entitiesOrder, selectedEntities, hoveringEntity, onMouseEnter, onMouseLeave, onMouseDown }) => {
    const entities = store.getState().doc.present.entities;
    return (
        <Fragment>
            <h5 className="layer-heading">Layers</h5>
            <div className="layers">
                {entitiesOrder.map(entityId => (
                    <Layer
                        key={`layer-${entityId}`}
                        entityId={entityId}
                        selected={selectedEntities.includes(entityId)}
                        hovering={hoveringEntity === entityId}
                        text={entities[entityId].caption || entityId}
                        mouseEnterHandler={onMouseEnter}
                        mouseLeaveHandler={onMouseLeave}
                        mouseDownHandler={onMouseDown}
                    />
                ))}
            </div>
        </Fragment>
    );
};

Layers.defaultProps = {
    hoveringEntity: null,
};

Layers.propTypes = {
    entitiesOrder: PropTypes.array.isRequired,
    selectedEntities: PropTypes.array.isRequired,
    hoveringEntity: PropTypes.string,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layers);

