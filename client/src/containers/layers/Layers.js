import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layer from './Layer';
import { toggleHoverEntity, toggleSelectEntity } from '../../store/actions';

const mapStateToProps = state => ({
    entitiesOrder: state.doc.present.entitiesOrder,
    selectedEntities: state.doc.present.selected,
});

const mapDispatchToProps = dispatch => ({
    onMouseEnter: entityId => dispatch(toggleHoverEntity(entityId, true)),
    onMouseLeave: entityId => dispatch(toggleHoverEntity(entityId, false)),
    onMouseDown: entityId => dispatch(toggleSelectEntity(entityId, true, true)),
});

class Layers extends PureComponent {
    render() {
        const { entitiesOrder, selectedEntities, onMouseEnter, onMouseLeave, onMouseDown } = this.props;
        return (
            <Fragment>
                <h5 className="layer-heading">Layers</h5>
                <div className="layers">
                    {entitiesOrder.map(entityId => (
                        <Layer
                            key={`layer-${entityId}`}
                            entityId={entityId}
                            selected={selectedEntities.includes(entityId)}
                            mouseEnterHandler={onMouseEnter}
                            mouseLeaveHandler={onMouseLeave}
                            mouseDownHandler={onMouseDown}
                        />
                    ))}
                </div>
            </Fragment>
        );
    }
}

Layers.defaultProps = {
    hoveringEntity: null,
};

Layers.propTypes = {
    entitiesOrder: PropTypes.array.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    selectedEntities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layers);

