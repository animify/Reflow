import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { ActionCreators } from 'redux-undo';
import PropTypes from 'prop-types';
import Entities from './Entities';
import Frames from './frames/Frames';
import { pan, zoom, deselectAllEntities, duplicateSelected } from '../store/actions';
import { scaleWheelDelta, clientPoint } from '../utils/helpers';

let isCmdDown = false;

const keyMap = {
    duplicate: 'mod+d',
    undo: 'mod+z',
    redo: 'mod+shift+z',
    mod: 'mod',
    commandDown: { sequence: 'alt', action: 'keydown' },
    commandUp: { sequence: 'alt', action: 'keyup' },
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
});

const mapDispatchToProps = dispatch => ({
    onUndo: () => dispatch(ActionCreators.undo()),
    onRedo: () => dispatch(ActionCreators.redo()),
    onDuplicate: () => dispatch(duplicateSelected()),
    pan: (x, y) => dispatch(pan(x, y)),
    deselectAll: () => dispatch(deselectAllEntities()),
    zoom: (matrix, multiplier) => dispatch(zoom(matrix, multiplier)),
});

class Canvas extends PureComponent {
    constructor(props) {
        super(props);

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
        const data = this.props.canvas;

        if (isCmdDown) {
            const wD = e.wheelDelta;
            const dY = e.deltaY;
            const delta = wD || dY * -1;
            let multiplier = scaleWheelDelta(delta, e.ctrlKey, true);
            let futureScale = data.scale * multiplier;

            if (futureScale >= 4) {
                futureScale = 4;
                multiplier = futureScale / data.scale;
            }

            if (futureScale <= 0.05) {
                futureScale = 0.05;
                multiplier = futureScale / data.scale;
            }
            if (futureScale <= 4 && futureScale >= 0.05) {
                const point = clientPoint(this.svgRenderer, { x: e.clientX, y: e.clientY }, data.matrix);
                this.zoom(point, multiplier);
            }
        } else {
            this.pan((e.deltaX * -1) / data.scale, (e.deltaY * -1) / data.scale);
        }
    }

    pan(x, y) {
        window.requestAnimationFrame(() => {
            const newMatrix = this.props.canvas.matrix.translate(x, y);
            this.props.pan(newMatrix);
        });
    }

    zoom(point, multiplier) {
        window.requestAnimationFrame(() => {
            const newMatrix = this.props.canvas.matrix.translate((1 - multiplier) * point.x, (1 - multiplier) * point.y).scale(multiplier);
            this.props.zoom(newMatrix, this.props.canvas.scale * multiplier);
        });
    }

    render() {
        const { onUndo, onRedo, canvas, deselectAll, onDuplicate } = this.props;
        const matrix = canvas.matrix;
        const handlers = {
            ...keyHandlers,
            undo: onUndo,
            redo: onRedo,
            duplicate: (event) => {
                event.preventDefault();
                onDuplicate();
            },
        };

        return (
            <HotKeys className="renderer" keyMap={keyMap} handlers={handlers} style={{ backgroundColor: '#1b1c1c' }} focused>
                <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink" ref={(ref) => { this.svgRenderer = ref; }} onMouseDown={deselectAll}>
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
    canvas: PropTypes.object.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    pan: PropTypes.func.isRequired,
    zoom: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    deselectAll: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

