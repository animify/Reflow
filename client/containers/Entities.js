import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './Entity';

const mapStateToProps = state => ({
    entities: state.entities,
});

const Entities = ({ entities }) => (
    <Fragment>
        {
            entities.map(entity => (
                <Entity key={entity.id} entity={entity} />
            ))
        }
    </Fragment>
);

Entities.propTypes = {
    entities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

