import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Screen from './Screen';

const mapStateToProps = state => ({
    entities: state.entities,
});

const Entities = ({ entities }) => (
    <Fragment>
        {
            Object.values(entities).filter(en => en.type === 'screen').map(entity => (
                <Screen key={entity.id} entity={entity} />
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

