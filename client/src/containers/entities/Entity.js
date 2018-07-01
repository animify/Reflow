import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import { toggleHoverEntity, toggleSelectEntity, updateEntity } from '../../store/actions';
import Screen from './Screen';
import Shape from './Shape';
import Image from './Image';
import Link from './Link';
import Keys from '../../../utils/hotkeys';
import { getEntity, getCurrentTest, getIsPresenting, getHovering } from '../../selectors/state';
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
    // image: {
    //     component: Image,
    //     options: {
    //         resizable: true,
    //         draggable: true
    //     }
    // },
    // link: {
    //     component: Link,
    //     options: {
    //         resizable: false,
    //         draggable: false
    //     }
    // }
};

const makeMapStateToProps = (initialState, initialProps) => {
    return state => ({
        entity: getEntity(state, initialProps),
        hovering: getHovering(state) === initialProps.entityId,
        currentTest: getCurrentTest(state),
        isPresenting: getIsPresenting(state)
    });
}


const mapDispatchToProps = dispatch => ({
    onMouseEnter: entityId => dispatch(toggleHoverEntity(entityId, true)),
    onMouseLeave: entityId => dispatch(toggleHoverEntity(entityId, false)),
    onMouseDown: entityId => dispatch(toggleSelectEntity(entityId, true, !Keys.cmdPressed)),
    updateEntityProps: (entityId, data) => dispatch(updateEntity(entityId, data)),
});

const getEntityComponent = (type) => {
    if (entityMap[type]) {
        return entityMap[type];
    }

    return null;
};

class Entity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: props.entity.position.x,
            y: props.entity.position.y,
        }
    }

    intvl = null;

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.x !== nextState.x ||
            this.state.y !== nextState.y ||
            this.props.entity.position.x !== nextProps.entity.position.x ||
            this.props.entity.position.y !== nextProps.entity.position.y ||
            this.props.isPresenting !== nextProps.isPresenting
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTest === 10) {
            this.updatePosition();
        } else {
            this.clearIntvl();
        }
    }

    componentDidMount() {
        if (this.props.currentTest === 10) {
            this.updatePosition();
        }

        if (this.props.currentTest === 0) {
            this.clearIntvl();
        }
    }

    clearIntvl() {
        if (this.intvl !== null) {
            clearInterval(this.intvl);
            this.intvl = null;
        }
    }

    componentWillUnmount() {
        this.clearIntvl();
    }

    updatePosition = () => {
        this.clearIntvl();
        this.intvl = setInterval(() => {
            this.setState((prevState) => ({
                x: prevState.x + (Math.random() - 0.5) * 200,
                y: prevState.y + (Math.random() - 0.5) * 200
            }))
        }, 30)
    }

    handlers = {
        isDragging: false,
        onMouseDown: (e) => {
            e.stopPropagation();
            this.props.onMouseDown(this.props.entityId);
        },
        onMouseEnter: (e) => {
            this.props.onMouseEnter(this.props.entityId);
        },
        onMouseLeave: (e) => {
            this.props.onMouseLeave(this.props.entityId);
        },
        onStart: () => {
            this.handlers.isDragging = true;
        },
        onDrag: () => { },
        onStop: (e, data) => {
            this.handlers.isDragging = false;
            this.props.updateEntityProps(this.props.entityId, { position: { x: data.x, y: data.y } });
        }
    };

    container = ({ children, draggable }) => {
        const { entity, isPresenting } = this.props;

        return (draggable ?
            <Draggable
                grid={null}
                disabled={isPresenting || Boolean(entity.locked)}
                position={entity.position}
                onMouseEnter={this.handlers.onMouseEnter}
                onMouseLeave={this.handlers.onMouseLeave}
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
        const { x, y } = this.state;
        const entityOptions = getEntityComponent(entity.type);
        if (entityOptions === null) {
            return null;
        }

        const style = {
            stroke: 'green',
            strokeWidth: isPresenting ? 4 : 0,
            width: entity.size.w + 4,
            height: entity.size.h + 4,
        }
        const translate = `translate(${x}, ${y})`
        // const Container = this.container;
        const EntityComponent = entityOptions.component;

        return (
            <g transform={translate} onMouseEnter={this.handlers.onMouseEnter} onMouseLeave={this.handlers.onMouseLeave}>
                {/* <Container draggable={entityOptions.options.draggable}> */}
                <rect fill="transparent" style={style} x="-2" y="-2" />
                <EntityComponent entity={entity} isPresenting={isPresenting} hovering={hovering} />
                {/* </Container> */}
            </g >
        );
    }
}

Entity.propTypes = {
    entityId: PropTypes.string.isRequired,
    currentTest: PropTypes.number.isRequired,
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

