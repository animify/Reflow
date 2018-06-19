import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';

const mapStateToProps = state => ({
    entities: state.entities.present,
});

const Entities = ({ entities }) => (
    <Fragment>
        {
            Object.values(entities).filter(en => en.type === 'screen').map(entity => (
                <Entity key={entity.id} entity={entity} />
            ))
        }
    </Fragment>
);

Entities.propTypes = {
    entities: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

