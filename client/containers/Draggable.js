import React, { PureComponent } from 'react';
import { DraggableCore } from 'react-draggable';
import store from '../store';
import { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } from 'constants';

const createDraggableData = (draggable, coreData, scale) => {
    const deltaX = Math.round(coreData.deltaX / scale);
    const deltaY = Math.round(coreData.deltaY / scale);

    return {
        node: coreData.node,
        x: draggable.state.x + deltaX,
        y: draggable.state.y + deltaY,
        deltaX: deltaX,
        deltaY: deltaY,
        lastX: draggable.state.x,
        lastY: draggable.state.y
    };
}

export default class Draggable extends PureComponent {
    constructor(props) {
        super(props);

        this.dragging = false;
        this.dragged = false;
        this.scale = 1;

        this.state = {
            x: props.position.x,
            y: props.position.y,
        };

        this.x = props.position.x;
        this.y = props.position.y;
        this.intvl = null;
    }

    // componentDidMount() {
    //     this.startMove();
    // }

    // componentWillUnmount() {
    //     window.cancelAnimationFrame(this.intvl);
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props && (nextProps.position.x !== this.props.position.x ||
            nextProps.position.y !== this.props.position.y)) {
            this.setState({ x: nextProps.position.x, y: nextProps.position.y });
        }
    }

    // posMove = () => {
    //     this.setState((prevState) => ({
    //         x: prevState.x + 15
    //     }));

    //     this.startMove();
    // }

    // startMove = () => {
    //     this.intvl = window.requestAnimationFrame(this.posMove);
    // }

    onDragStart = (e, coreData) => {
        const { canvas } = store.getState();

        const shouldStart = this.props.onStart(e, createDraggableData(this, coreData, canvas.scale));
        if (shouldStart === false) return false;

        this.scale = canvas.scale;
    };

    onDrag = (e, coreData) => {
        const uiData = createDraggableData(this, coreData, this.scale);
        const shouldUpdate = this.props.onDrag(e, uiData);
        if (shouldUpdate === false) return false;

        this.dragging = true;
        this.dragged = true;

        this.setState({
            x: uiData.x,
            y: uiData.y
        });
    };

    onDragStop = (e, coreData) => {
        if (!this.dragging) return false;

        const shouldStop = this.props.onStop(e, createDraggableData(this, coreData, this.scale));
        if (shouldStop === false) return false;

        this.dragging = false;
    };

    render() {
        const { x, y } = this.state;
        const transform = `translate(${x}, ${y})`;

        return (
            <DraggableCore {...this.props} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
                <g transform={transform}>
                    {this.props.children}
                </g>
            </DraggableCore>
        );
    }
}
