import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

const d3Shape = require('d3-shape');

const lineCreator = d3Shape
    .line()
    .x(d => d.x)
    .y(d => d.y);

export default class Link extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.entity.id !== nextProps.entity.id;
    }

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
