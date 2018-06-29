import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';

const mapStateToProps = state => ({
    entitiesOrder: state.getIn(['doc']).present.get('entitiesOr\der')
});

const Entities = ({ entitiesOrder }) => (
    <Fragment>
        {console.log(entitiesOrder.valueSeq())}
        {entitiesOrder.valueSeq().map(entityId => (
            <Entity key={`entity-${entityId}`} entityId={entityId} />
        ))}
    </Fragment >
);

Entities.propTypes = {
    entitiesOrder: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

