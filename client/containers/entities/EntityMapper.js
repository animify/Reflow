import React from 'react';
import PropTypes from 'prop-types';
import Screen from './Screen';

const entityMap = {
    screen: {
        component: Screen,
        options: {
            resizable: false
        }
    }
};

const EntityMapper = ({ entity }) => {
    const EntityType = entityMap[entity.type].component;

    return <EntityType entity={entity} />;
};

EntityMapper.propTypes = {
    entity: PropTypes.object.isRequired
};

export default EntityMapper;
