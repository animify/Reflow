import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entity from './entities/Entity';
import * as tests from '../../utils/interv';

const mapStateToProps = state => ({
    entitiesOrder: state.doc.present.entitiesOrder
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

