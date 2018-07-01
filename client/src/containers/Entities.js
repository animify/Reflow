import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';
import { getEntitiesOrder } from '../selectors';

const mapStateToProps = state => ({
    entitiesOrder: getEntitiesOrder(state)
});

class Entities extends PureComponent {
    render() {
        const { entitiesOrder } = this.props;
        return (
            <Fragment>
                {entitiesOrder.map(entityId => (
                    <Entity key={`entity-${entityId}`} entityId={entityId} />
                ))}
            </Fragment >
        );
    }
}

Entities.propTypes = {
    entitiesOrder: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

