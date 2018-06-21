import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import { mouseEnter, mouseLeave, mouseClick, updateEntity } from '../../store/actions';
import store from '../../store';
import EntityMapper from './EntityMapper';
// import { checkVisible } from '../../utils/helpers';

const mapStateToProps = (state, ownProps) => ({
    entity: state.entities.present.list[ownProps.entityId]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(mouseEnter(ownProps.entityId)),
    onMouseLeave: () => dispatch(mouseLeave(ownProps.entityId)),
    onClick: () => dispatch(mouseClick(ownProps.entityId)),
});

const handlers = {
    onStart: () => {
    },
    onDrag: () => {
    },
    onStop: (entityId, data) => {
        store.dispatch(updateEntity(entityId, { position: { x: data.x, y: data.y } }));
    }
};

class Entity extends Component {
    shouldComponentUpdate(newProps) {
        return this.props.entity !== newProps.entity;
    }

    render() {
        const { entity, entityId, onMouseEnter, onMouseLeave, onClick } = this.props;
        const style = {
            opacity: entity.opacity,
            width: entity.size.h,
            height: entity.size.h,
        };

        return (
            <Draggable
                grid={null}
                disabled={entity.locked}
                position={entity.position}
                onStart={(e, i) => handlers.onStart(entityId, e, i)}
                onDrag={(e, i) => handlers.onDrag(entityId, e, i)}
                onStop={(e, data) => handlers.onStop(entityId, data)}
                scale={1}
            >
                <g
                    key={entity.id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    style={style}
                    opacity={entity.opacity}
                >
                    <EntityMapper entity={entity} />
                </g>
            </Draggable>
        );
    }
}

Entity.propTypes = {
    entityId: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entity);

