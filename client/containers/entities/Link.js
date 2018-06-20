import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

const d3Shape = require('d3-shape');

const lineCreator = d3Shape
    .line()
    .x(d => d.x)
    .y(d => d.y);

export default class Link extends PureComponent {
    render() {
        const { entity } = this.props;

        return (
            <Fragment>
                <path d={lineCreator(entity.points)} strokeWidth={2} stroke={'red'} fill="none" />
            </Fragment>
        );
    }
}

Link.propTypes = {
    entity: PropTypes.object.isRequired,
};
