import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEntitiesOrder } from '../../selectors';

const mapStateToProps = state => ({
    entitiesLength: getEntitiesOrder(state).length,
});

class Stats extends PureComponent {
    render() {
        const { entitiesLength } = this.props;
        return (
            <Fragment>
                <h5 className="layer-heading">Stats</h5>
                <div className="layers">
                    <div className="layer">
                        Total entities: <strong>{entitiesLength}</strong>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Stats.propTypes = {
    entitiesLength: PropTypes.number.isRequired
};

export default connect(
    mapStateToProps,
)(Stats);

