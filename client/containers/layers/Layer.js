import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const makeMapStateToProps = (initialState, initialProps) => {
    const { entityId } = initialProps;
    const mapStateToProps = state => ({
        entity: state.doc.present.entities[entityId]
    });
    return mapStateToProps;
};

class Layer extends PureComponent {
    render() {
        const { entityId, entity, selected, mouseEnterHandler, mouseLeaveHandler, mouseDownHandler } = this.props;
        const selectedClass = selected && 'layer selected';
        const className = selectedClass || 'layer';

        return (
            <div
                role="presentation"
                className={className}
                onMouseEnter={() => mouseEnterHandler(entityId)}
                onMouseLeave={() => mouseLeaveHandler(entityId)}
                onMouseDown={() => mouseDownHandler(entityId)}
            >
                <span>{(entity && entity.caption) || entityId}</span>
            </div >
        );
    }
}

Layer.propTypes = {
    entityId: PropTypes.string.isRequired,
    entity: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    mouseEnterHandler: PropTypes.func.isRequired,
    mouseLeaveHandler: PropTypes.func.isRequired,
    mouseDownHandler: PropTypes.func.isRequired,
};

export default connect(
    makeMapStateToProps,
)(Layer);

