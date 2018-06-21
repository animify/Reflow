import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Frame extends PureComponent {
    render() {
        const { entity } = this.props;
        return (
            <g key={entity.id} transform={`translate(${entity.position.x}, ${entity.position.y})`}>
                <rect strokeWidth="1.5" stroke={entity.selected ? 'blue' : 'pink'} width={entity.size.w} height={entity.size.h} fill="none" />
            </g>
        );
    }
}

Frame.propTypes = {
    entity: PropTypes.object.isRequired,
};
