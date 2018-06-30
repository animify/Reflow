import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { generateDiamondPath } from '../../../utils/helpers';

export default class Shape extends PureComponent {
    generateShape = ({ style }) => {
        const { entity } = this.props;
        switch (entity.category) {
            case 'rect':
                return (
                    <rect style={style} />
                )
            case 'ellipse':
                const halves = {
                    w: entity.size.w / 2,
                    h: entity.size.h / 2,
                }
                return (
                    <ellipse rx={halves.w} ry={halves.h} cx={halves.w} cy={halves.h} style={style} />
                )
            case 'diamond':
                return (
                    <path d={generateDiamondPath(entity.size)} style={style} />
                )
        }

    }

    render() {
        const { entity } = this.props;
        const style = {
            fill: '#fff',
            width: entity.size.w,
            height: entity.size.h,
        };
        const Shape = this.generateShape;

        return (
            <Fragment>
                <Shape style={style} />
            </Fragment>
        );
    }
}

Shape.propTypes = {
    entity: PropTypes.object.isRequired,
};
