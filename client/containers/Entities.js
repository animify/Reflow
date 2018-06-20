import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';

const mapStateToProps = state => ({
    entities: state.entities.present,
});

const Entities = ({ entities, scale }) => (
    <Fragment>
        {
            Object.values(entities).filter(en => en.type === 'screen' || en.type === 'link').map(entity => (
                <Entity key={entity.id} entity={entity} scale={scale} />
            ))
        }
    </Fragment>
);

Entities.propTypes = {
    entities: PropTypes.object.isRequired,
    scale: PropTypes.number.isRequired,
};

export default connect(
    mapStateToProps,
)(Entities);

