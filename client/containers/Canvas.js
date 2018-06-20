import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { ActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';
import Entities from './Entities';
import Frames from './Frames';
import { pan, zoom } from '../store/actions';
import { scaleWheelDelta, clientPoint } from '../utils/helpers';

let isCmdDown = false;

const keyMap = {
    undo: 'mod+z',
    redo: 'mod+shift+z',
    mod: 'mod',
    commandDown: { sequence: 'mod', action: 'keydown' },
    commandUp: { sequence: 'mod', action: 'keyup' },
};

const keyHandlers = {
    commandDown: () => {
        isCmdDown = true;
    },
    commandUp: () => {
        isCmdDown = false;
    },
};

const mapStateToProps = state => ({
    canvas: state.canvas,
    settings: state.settings,
    title: state.title,
});

const mapDispatchToProps = dispatch => ({
    onUndo: () => dispatch(ActionCreators.undo()),
    onRedo: () => dispatch(ActionCreators.redo()),
    pan: (x, y) => dispatch(pan(x, y)),
    zoom: (matrix, multiplier) => dispatch(zoom(matrix, multiplier)),
});

class Canvas extends PureComponent {
    constructor(props) {
        super(props);
        // this.svgRenderer = React.createRef();
        this.onWheel = this.onWheel.bind(this);
        this.pan = this.pan.bind(this);
        this.zoom = this.zoom.bind(this);
    }

    componentDidMount() {
        this.svgRenderer.addEventListener('wheel', this.onWheel, { passive: true });
    }

    componentWillUnmount() {
        this.svgRenderer.removeEventListener('wheel', this.onWheel, { passive: true });
    }

    onWheel(e) {
        if (isCmdDown) {
            const wD = e.wheelDelta;
            const dY = e.deltaY;
            const delta = wD || dY * -1;
            let multiplier = scaleWheelDelta(delta, e.ctrlKey, true);
            let futureScale = this.props.canvas.scale * multiplier;

            if (futureScale >= 4) {
                futureScale = 4;
                multiplier = futureScale / this.props.canvas.scale;
            }

            if (futureScale <= 0.05) {
                futureScale = 0.05;
                multiplier = futureScale / this.props.canvas.scale;
            }
            if (futureScale <= 4 && futureScale >= 0.05) {
                const point = clientPoint(this.svgRenderer, { x: e.clientX, y: e.clientY }, this.props.canvas.matrix);
                this.zoom(point, multiplier);
            }
        } else {
            this.pan(e.deltaX * -1, e.deltaY * -1);
        }
    }

    pan(x, y) {
        const newMatrix = this.props.canvas.matrix.translate(x, y);
        this.props.pan(newMatrix);
    }

    zoom(point, multiplier) {
        const newMatrix = this.props.canvas.matrix.translate((1 - multiplier) * point.x, (1 - multiplier) * point.y).scale(multiplier);
        this.props.zoom(newMatrix, this.props.canvas.scale * multiplier);
    }

    render() {
        const { onUndo, onRedo, canvas, settings, title } = this.props;
        const { matrix } = this.state;
        const handlers = {
            ...keyHandlers,
            undo: onUndo,
            redo: onRedo
        };

        return (
            <HotKeys className="renderer" keyMap={keyMap} handlers={handlers} focused>
                <div className="stats">
                    <p><strong>Board:</strong> {title}</p>
                    <p><strong>Scale:</strong> {canvas.scale}</p>
                    <p><strong>Grid:</strong> {settings.grid == null ? 'N/A' : settings.grid.enabled}</p>
                </div>
                <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink" ref={(ref) => { this.svgRenderer = ref; }}>
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Entities />
                    </g>
                </svg>
                <svg id="renderer-overlay" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Frames />
                    </g>
                </svg>
            </HotKeys>
        );
    }
}

Canvas.propTypes = {
    settings: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    canvas: PropTypes.object.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    pan: PropTypes.func.isRequired,
    zoom: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

