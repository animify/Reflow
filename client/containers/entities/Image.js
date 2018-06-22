import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Image extends PureComponent {
    render() {
        const { entity } = this.props;

        return (
            <Fragment>
                <image width={entity.size.w} height={entity.size.h} xlinkHref={entity.source.id} />
            </Fragment>
        );
    }
}

Image.propTypes = {
    entity: PropTypes.object.isRequired,
};
