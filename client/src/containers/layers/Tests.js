import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleTest, setEntities } from '../../store/actions';
import { getCurrentTest, getCurrentPage } from '../../selectors';
import { updateInverval } from '../../store/actions/timers';
import store from '../../store';
import { ActionCreators } from 'redux-undo';
import { delay } from '../../../utils/helpers';

const mapStateToProps = state => ({
    currentTest: getCurrentTest(state),
    currentPage: getCurrentPage(state)
});

const mapDispatchToProps = dispatch => ({
    switchTest: num => dispatch(toggleTest(num)),
    updateInterval: intv => dispatch(updateInverval(intv)),
});

class Tests extends PureComponent {
    invtl = null;
    invtlNum = 0;
    isCurrentTest = num => this.props.currentTest === num;

    toggleTest1 = async () => {
        this.props.switchTest(10);
        if (this.isCurrentTest(10)) {
            clearInterval(this.intvl)
        } else {
            setTimeout(async () => {
                clearInterval(this.intvl);
                this.props.switchTest(11);
                await delay(500);
                store.dispatch(ActionCreators.undo());
                await delay(500);
                this.props.switchTest(0);
            }, 1000);

            this.intvl = setInterval(() => {
                this.props.updateInterval(this.invtlNum)
                ++this.invtlNum;
            }, 30);
        }
    };

    toggleTest2 = () => {
        this.props.switchTest(20);
    };

    render() {
        return (
            <Fragment>
                <h5 className="layer-heading">Tests</h5>
                <div className="layers">
                    <div role="presentation" className={this.isCurrentTest(10) ? 'layer selected' : 'layer'} onClick={this.toggleTest1}>
                        <strong>Run Test 1</strong>
                    </div>
                    <div role="presentation" className={this.isCurrentTest(20) ? 'layer selected' : 'layer'} onClick={this.toggleTest2}>
                        <strong>Run Test 2</strong>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Tests.propTypes = {
    currentTest: PropTypes.number.isRequired,
    switchTest: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tests);

