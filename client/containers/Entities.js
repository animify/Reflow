import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';

const mapStateToProps = state => ({
    entitiesOrder: state.entities.present.order,
});

const Entities = ({ entitiesOrder }) => (
    <Fragment>
        {entitiesOrder.map(entityId => (
            <Entity key={entityId} entityId={entityId} />
        ))}
    </Fragment >
);

Entities.propTypes = {
    entitiesOrder: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

