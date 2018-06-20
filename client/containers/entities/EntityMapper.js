import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Screen from './Screen';
import Link from './Link';

const entityMap = {
    screen: {
        component: Screen,
        options: {
            resizable: false
        }
    },
    link: {
        component: Link,
        options: {
            resizable: false
        }
    }
};

export default class EntityMapper extends PureComponent {
    render() {
        const { entity } = this.props;
        const EntityType = entityMap[entity.type].component;

        return <EntityType entity={entity} />;
    }
}

EntityMapper.propTypes = {
    entity: PropTypes.object.isRequired
};
