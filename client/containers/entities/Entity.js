import React, { Component } from 'react';
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
        return {
            entity: state.doc.present.entities[entityId],
            hovering: state.doc.present.hovering === entityId,
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

const getEntityComponent = (type) => {
    if (entityMap[type]) {
        return entityMap[type];
    }

    return null;
};

class Entity extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.entity.position.x !== nextProps.entity.position.x || this.props.entity.position.y !== nextProps.entity.position.y
    }

    handlers = {
        isDragging: false,
        onMouseDown: (e) => {
            e.stopPropagation();
            this.props.onMouseDown();
        },
        onStart: () => {
            this.handlers.isDragging = true;
        },
        onDrag: () => {
        },
        onStop: (e, data) => {
            this.handlers.isDragging = false;
            store.dispatch(updateEntity(this.props.entityId, { position: { x: data.x, y: data.y } }));
        }
    };

    container = ({ children, draggable }) => {
        const { entity, onMouseEnter, onMouseLeave, isPresenting } = this.props;

        return (draggable ?
            <Draggable
                grid={null}
                disabled={isPresenting || Boolean(entity.locked)}
                position={entity.position}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseDown={this.handlers.onMouseDown}
                onStart={this.handlers.onStart}
                onDrag={this.handlers.onDrag}
                onStop={this.handlers.onStop}
                scale={1}
            >
                {children}
            </Draggable> :
            <g>
                {children}
            </g>
        )
    };

    render() {
        const { entity, hovering, isPresenting } = this.props;
        const entityOptions = getEntityComponent(entity.type);

        if (entityOptions === null) {
            return null;
        }

        const Container = this.container;
        const EntityComponent = entityOptions.component;

        return (
            <Container draggable={entityOptions.options.draggable}>
                <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
                <EntityComponent entity={entity} isPresenting={isPresenting} hovering={hovering} />
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

