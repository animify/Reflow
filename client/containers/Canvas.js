import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { ActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';
import produce from 'immer';
import Entities from './Entities';
import Frames from './Frames';

const keyMap = {
    undo: 'ctrl+z',
    redo: 'ctrl+shift+z',
};

const mapStateToProps = state => ({
    entities: state.entities,
});

const mapDispatchToProps = dispatch => ({
    onUndo: () => dispatch(ActionCreators.undo()),
    onRedo: () => dispatch(ActionCreators.redo()),
});


class Canvas extends PureComponent {
    constructor(props) {
        super(props);
        this.svgRenderer = React.createRef();
        this.onWheel = this.onWheel.bind(this);
        this.pan = this.pan.bind(this);
    }

    componentWillMount() {
        this.setState({
            matrix: document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix()
        });
    }

    onWheel(e) {
        this.pan(e.deltaX * -1, e.deltaY * -1);
    }

    pan(x, y) {
        this.setState(produce((draft) => {
            draft.matrix = draft.matrix.translate(x, y);
        }));
    }

    render() {
        const { entities, onUndo, onRedo } = this.props;
        const { matrix } = this.state;
        const handlers = {
            undo: onUndo,
            redo: onRedo
        };

        return (
            <HotKeys className="renderer" keyMap={keyMap} handlers={handlers} onWheel={this.onWheel}>
                <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink" ref={(ref) => { this.svgRenderer = ref; }}>
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Entities entities={entities} />
                    </g>
                </svg>
                <svg id="renderer-overlay" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Frames entities={entities} />
                    </g>
                </svg>
            </HotKeys>
        );
    }
}

Canvas.propTypes = {
    entities: PropTypes.object.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

