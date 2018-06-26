import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entities from './Entities';
import Frames from './frames/Frames';
import { pan, zoom, deselectAllEntities } from '../store/actions';
import { scaleWheelDelta, clientPoint } from '../utils/helpers';
import Keys from '../utils/hotkeys';

const mapStateToProps = state => ({
    canvas: state.canvas,
});

const mapDispatchToProps = dispatch => ({
    pan: (x, y) => dispatch(pan(x, y)),
    deselectAll: (e) => {
        e.preventDefault();
        e.stopPropagation();
        // dispatch(deselectAllEntities());
    },
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

        if (Keys.cmdPressed) {
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
        const { canvas: { matrix }, deselectAll } = this.props;

        return (
            <Fragment>
                <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink" ref={(ref) => { this.svgRenderer = ref; }} onMouseDown={deselectAll}>
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Entities />
                    </g>
                </svg>
                <svg id="renderer-overlay" className="ignore-events" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g transform={`matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})`}>
                        <Frames />
                    </g>
                </svg>
            </Fragment>
        );
    }
}

Canvas.propTypes = {
    canvas: PropTypes.object.isRequired,
    pan: PropTypes.func.isRequired,
    zoom: PropTypes.func.isRequired,
    deselectAll: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

