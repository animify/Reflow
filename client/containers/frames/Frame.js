import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
    entity: state.doc.present.entities[ownProps.entityId]
});

class Frame extends PureComponent {
    render() {
        const { entity, scale } = this.props;

        return (
            <g key={entity.id} transform={`translate(${entity.position.x}, ${entity.position.y})`}>
                <rect strokeWidth={1.5 / scale} stroke={'#16abee'} width={entity.size.w} height={entity.size.h} fill="none" />
            </g>
        );
    }
}

Frame.propTypes = {
    scale: PropTypes.number.isRequired,
    entity: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Frame);
