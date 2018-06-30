import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleTest } from '../../store/actions';

const mapStateToProps = state => ({
    currentTest: state.doc.present.currentTest,
});

const mapDispatchToProps = dispatch => ({
    switchTest: num => dispatch(toggleTest(num)),
});

class Tests extends PureComponent {
    toggleTest1 = () => this.props.switchTest(1);
    toggleTest2 = () => this.props.switchTest(2);
    isCurrentTest = num => this.props.currentTest === num;

    render() {
        return (
            <Fragment>
                <h5 className="layer-heading">Tests</h5>
                <div className="layers">
                    <div role="presentation" className={this.isCurrentTest(1) ? 'layer selected' : 'layer'} onClick={this.toggleTest1}>
                        <strong>Run Test 1</strong>
                    </div>
                    <div role="presentation" className={this.isCurrentTest(2) ? 'layer selected' : 'layer'} onClick={this.toggleTest2}>
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

