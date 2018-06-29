import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    // shape: {
    //     component: Shape,
    //     options: {
    //         resizable: true,
    //         draggable: true
    //     }
    // },
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
    const entityId = initialProps.entityId;
    const mapStateToProps = state => ({
        entity: state.get('doc').present.getIn(['entities', entityId]),
        hovering: state.get('doc').present.get('hovering') === entityId,
        isPresenting: state.getIn(['canvas', 'isPresenting']) || false
    });
    return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
    onMouseDown: (entityId, cmdPressed) => dispatch(toggleSelectEntity(entityId, true, cmdPressed)),
});

const getEntityComponent = (type) => {
    if (entityMap[type]) {
        return entityMap[type];
    }

    return null;
};

class Entity extends Component {
    shouldComponentUpdate(nextProps) {
        console.log(this.props.entity.get('position').is(nextProps.entity.get('position')));
        return this.props.entity.get('position').is(nextProps.entity.get('position'));
    }

    render() {
        const { entity, hovering, isPresenting } = this.props;
        const entityOptions = getEntityComponent(entity.get('type'));

        if (entityOptions === null) {
            return null;
        }

        const EntityComponent = entityOptions.component;

        return (
            <g transform={`translate(${entity.getIn(['position', 'x'])}, ${entity.getIn(['position', 'y'])})`}>
                <rect width={entity.getIn(['size', 'w'])} height={entity.getIn(['size', 'h'])} fill="blue" />
                <EntityComponent entity={entity} isPresenting={isPresenting} hovering={hovering} />
            </g>
        );
    }
}

Entity.propTypes = {
    entityId: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    hovering: PropTypes.bool.isRequired,
    isPresenting: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(Entity);

