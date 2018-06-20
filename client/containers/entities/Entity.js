import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';
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
        store.dispatch(updateEntity(`${entity.type}${entity.id}`, { position: { x: i.x, y: i.y } }));
    }
};

class Entity extends PureComponent {
    render() {
        const { settings, canvas } = this.props;
        const { entity, onMouseEnter, onMouseLeave, onClick } = this.props;
        const style = {
            width: entity.size.h,
            height: entity.size.h,
        };

        return (checkVisible({
            top: entity.position.y,
            left: entity.position.x,
            right: entity.position.x + entity.size.w,
            bottom: entity.position.y + entity.size.h
        }, canvas) ?
            <Draggable
                grid={settings.grid}
                disabled={entity.locked}
                position={entity.position}
                onStart={(e, i) => handlers.onStart(entity, e, i)}
                onDrag={(e, i) => handlers.onDrag(entity, e, i)}
                onStop={(e, i) => handlers.onStop(entity, e, i)}
                defaultClassName={''}
                defaultClassNameDragging={''}
                defaultClassNameDragged={''}
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
            </Draggable> : null
        );
    }
}

Entity.propTypes = {
    entity: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    canvas: PropTypes.object.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Entity);

