import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import { toggleHoverEntity, toggleSelectEntity, updateEntity } from '../../store/actions';
import store from '../../store';
import Screen from './Screen';
import Image from './Image';
import Link from './Link';
// import { checkVisible } from '../../utils/helpers';

const entityMap = {
    screen: {
        component: Screen,
        options: {
            resizable: false,
            draggable: true
        }
    },
    image: {
        component: Image,
        options: {
            resizable: false,
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

const mapStateToProps = (state, ownProps) => ({
    entity: state.doc.present.entities[ownProps.entityId],
    hovering: state.doc.present.hovering === ownProps.entityId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(toggleHoverEntity(ownProps.entityId, true)),
    onMouseLeave: () => dispatch(toggleHoverEntity(ownProps.entityId, false)),
    onMouseDown: () => dispatch(toggleSelectEntity(ownProps.entityId, true, true)),
});

const handlers = {
    isDragging: false,
    onMouseDown: (e, followEvent) => {
        e.stopPropagation();
        followEvent();
    },
    onStart: () => {
        handlers.isDragging = true;
    },
    onDrag: () => {
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
    render() {
        const { entity, entityId, onMouseEnter, onMouseLeave, onMouseDown, selected, hovering } = this.props;
        const entityOptions = getEntityComponent(entity.type);
        const style = {
            opacity: entity.opacity,
            width: entity.size.w,
            height: entity.size.h,
        };

        console.log('rendering entity', entityId);

        if (entityOptions === null) {
            return null;
        }

        const EntityComponent = entityOptions.component;

        if (entityOptions.options.draggable) {
            return (
                <Draggable
                    grid={null}
                    disabled={Boolean(entity.locked)}
                    position={entity.position}
                    onMouseDown={e => handlers.onMouseDown(e, onMouseDown)}
                    onStart={(e, i) => handlers.onStart(entityId, e, i)}
                    onDrag={(e, i) => handlers.onDrag(entityId, e, i)}
                    onStop={(e, data) => handlers.onStop(entityId, data)}
                    scale={1}
                >
                    <g
                        onMouseEnter={!handlers.isDragging ? onMouseEnter : undefined}
                        onMouseLeave={!handlers.isDragging ? onMouseLeave : undefined}
                        style={style}
                    >
                        <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
                        <EntityComponent entity={entity} hovering={hovering} />
                    </g>
                </Draggable>
            );
        }

        return (
            <g
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={style}
            >
                <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
                <EntityComponent entity={entity} />
            </g>
        );
    }
}

Entity.propTypes = {
    entityId: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    hovering: PropTypes.bool.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entity);

