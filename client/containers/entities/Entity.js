import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import { toggleHoverEntity, toggleSelectEntity, updateEntity } from '../../store/actions';
import store from '../../store';
import Screen from './Screen';
import Shape from './Shape';
import Image from './Image';
import Link from './Link';
import Keys from '../../utils/hotkeys';
// import { checkVisible } from '../../utils/helpers';

const entityMap = {
    screen: {
        component: Screen,
        options: {
            resizable: false,
            draggable: true
        }
    },
    shape: {
        component: Shape,
        options: {
            resizable: true,
            draggable: true
        }
    },
    image: {
        component: Image,
        options: {
            resizable: true,
            draggable: true
        }
    },
    link: {
        component: Link,
        options: {
            resizable: false,
            draggable: false
        }
    }
};


const makeMapStateToProps = (initialState, initialProps) => {
    const { entityId } = initialProps;
    const mapStateToProps = (state) => {
        const { entities, hovering } = state.doc.present;
        const entity = entities[entityId];
        return {
            entity,
            hovering: hovering === entityId,
            isPresenting: state.canvas.presenting
        };
    };
    return mapStateToProps;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(toggleHoverEntity(ownProps.entityId, true)),
    onMouseLeave: () => dispatch(toggleHoverEntity(ownProps.entityId, false)),
    onMouseDown: () => dispatch(toggleSelectEntity(ownProps.entityId, true, !Keys.cmdPressed)),
});

const handlers = {
    isDragging: false,
    onMouseDown: (e, followEvent) => {
        e.stopPropagation();
        followEvent();
    },
    onStart: () => {
    },
    onDrag: () => {
        handlers.isDragging = true;
    },
    onStop: (entityId, data) => {
        store.dispatch(updateEntity(entityId, { position: { x: data.x, y: data.y } }));
        handlers.isDragging = false;
    }
};

const getEntityComponent = (type) => {
    if (entityMap[type]) {
        return entityMap[type];
    }

    return null;
};

class Entity extends PureComponent {
    container = ({ children, draggable }) => {
        const { entity, entityId, onMouseDown, isPresenting } = this.props;

        return (draggable ?
            <Draggable
                grid={null}
                disabled={isPresenting || Boolean(entity.locked)}
                position={entity.position}
                onMouseDown={e => handlers.onMouseDown(e, onMouseDown)}
                onStart={(e, i) => handlers.onStart(entityId, e, i)}
                onDrag={(e, i) => handlers.onDrag(entityId, e, i)}
                onStop={(e, data) => handlers.onStop(entityId, data)}
                scale={1}
            >
                {children}
            </Draggable> : children
        )
    };

    render() {
        const { entity, onMouseEnter, onMouseLeave, hovering, isPresenting } = this.props;
        const entityOptions = getEntityComponent(entity.type);
        const style = {
            opacity: entity.opacity,
            width: entity.size.w,
            height: entity.size.h,
        };

        if (entityOptions === null) {
            return null;
        }

        const Container = this.container;
        const EntityComponent = entityOptions.component;

        return (
            <Container draggable={entityOptions.options.draggable}>
                <g
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    style={style}
                >
                    <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
                    <EntityComponent entity={entity} isPresenting={isPresenting} hovering={hovering} />
                </g>
            </Container>
        );
    }
}

Entity.propTypes = {
    entityId: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    hovering: PropTypes.bool.isRequired,
    isPresenting: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(Entity);

