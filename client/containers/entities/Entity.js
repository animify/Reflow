import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from '../Draggable';
import { mouseEnter, mouseLeave, mouseClick, updateEntity } from '../../store/actions';
import store from '../../store';
import EntityMapper from './EntityMapper';
import { checkVisible } from '../../utils/helpers';

const mapStateToProps = state => ({
    settings: state.settings,
    canvas: state.canvas,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(mouseEnter(`${ownProps.entity.type}${ownProps.entity.id}`)),
    onMouseLeave: () => dispatch(mouseLeave(`${ownProps.entity.type}${ownProps.entity.id}`)),
    onClick: () => dispatch(mouseClick(`${ownProps.entity.type}${ownProps.entity.id}`)),
});

const handlers = {
    onStart: () => {
    },
    onDrag: () => {
    },
    onStop: (entity, e, i) => {
        console.log(e, i);
        store.dispatch(updateEntity(`${entity.type}${entity.id}`, { position: { x: i.x, y: i.y } }));
    }
};

class Entity extends PureComponent {
    render() {
        const { canvas } = this.props;
        const { entity, onMouseEnter, onMouseLeave, onClick, scale } = this.props;
        const style = {
            width: entity.size.h,
            height: entity.size.h,
        };

        return (
            <Draggable
                grid={null}
                disabled={entity.locked}
                position={entity.position}
                onStart={(e, i) => handlers.onStart(entity, e, i)}
                onDrag={(e, i) => handlers.onDrag(entity, e, i)}
                onStop={(e, i) => handlers.onStop(entity, e, i)}
                scale={scale}
            >
                <g
                    key={entity.id}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onClick={onClick}
                    style={style}
                >
                    <rect width={entity.size.w} height={entity.size.h} fill="transparent" />
                    <EntityMapper entity={entity} />
                </g>
            </Draggable>
        );
    }
}

Entity.propTypes = {
    entity: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    canvas: PropTypes.object.isRequired,
    scale: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entity);

