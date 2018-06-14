import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
import { mouseEnter, mouseLeave, mouseClick, repositionEntity } from '../store/actions';
import store from '../store';

const storeState = store.getState();

const mapStateToProps = state => ({
    entities: state.entities,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(mouseEnter(ownProps.entity)),
    onMouseLeave: () => dispatch(mouseLeave(ownProps.entity)),
    onClick: () => dispatch(mouseClick(ownProps.entity)),
});

const handlers = {
    onStart: (entity, e, i) => {
    },
    onDrag: (entity, e, i) => {
    },
    onStop: (entity, e, i) => {
        store.dispatch(repositionEntity(entity, i.x, i.y));
    }
};

const grid = storeState.globalSettings.grid;

const Screen = ({ entity, onMouseEnter, onMouseLeave, onClick }) => (
    <Draggable
        grid={grid}
        disabled={entity.locked}
        position={entity.position}
        onStart={(e, i) => handlers.onStart(entity, e, i)}
        onDrag={(e, i) => handlers.onDrag(entity, e, i)}
        onStop={(e, i) => handlers.onStop(entity, e, i)}
    >
        <g
            key={entity.id}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}

        >
            <image width={entity.size.w} height={entity.size.h} xlinkHref={entity.source.id} />
            <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
        </g>
    </Draggable>
);

Screen.propTypes = {
    entity: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Screen);

