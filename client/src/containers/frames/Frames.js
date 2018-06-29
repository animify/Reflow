import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Frame from './Frame';

const mapStateToProps = state => ({
    selectedEntities: state.doc.present.selected,
    hoveringEntity: state.doc.present.hovering,
    scale: state.canvas.scale
});

class Frames extends PureComponent {
    render() {
        const { selectedEntities, hoveringEntity, scale } = this.props;
        return (
            <g id="frames">
                {hoveringEntity !== null && <Frame entityId={hoveringEntity} scale={scale} />}
                {selectedEntities.map(entityId => (
                    <Frame key={`frame-${entityId}`} entityId={entityId} scale={scale} />
                ))}
            </g>
        );
    }
}

Frames.defaultProps = {
    hoveringEntity: null,
};

Frames.propTypes = {
    scale: PropTypes.number.isRequired,
    selectedEntities: PropTypes.array.isRequired,
    hoveringEntity: PropTypes.string,
};

export default connect(
    mapStateToProps,
)(Frames);

