import React, { PureComponent } from 'react';
import { DraggableCore } from 'react-draggable';

const createDraggableData = (draggable, coreData, scale) => {
    return {
        node: coreData.node,
        x: draggable.state.x + coreData.deltaX / scale,
        y: draggable.state.y + coreData.deltaY / scale,
        deltaX: coreData.deltaX / scale,
        deltaY: coreData.deltaY / scale,
        lastX: draggable.state.x,
        lastY: draggable.state.y
    };
}

export default class Draggable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
            dragged: false,

            x: props.position ? props.position.x : props.defaultPosition.x,
            y: props.position ? props.position.y : props.defaultPosition.y,
        };
    }

    onDragStart = (e, coreData) => {
        const shouldStart = this.props.onStart(e, createDraggableData(this, coreData, this.props.scale));
        if (shouldStart === false) return false;

        this.setState({ dragging: true, dragged: true });
    };

    onDrag = (e, coreData) => {
        if (!this.state.dragging) return false;

        const uiData = createDraggableData(this, coreData, this.props.scale);
        const shouldUpdate = this.props.onDrag(e, uiData);
        if (shouldUpdate === false) return false;

        this.setState({
            x: uiData.x,
            y: uiData.y
        });
    };

    onDragStop = (e, coreData) => {
        if (!this.state.dragging) return false;

        const shouldStop = this.props.onStop(e, createDraggableData(this, coreData, this.props.scale));
        if (shouldStop === false) return false;

        this.setState({
            dragging: false,
        });
    };

    render() {
        const { x, y } = this.state;
        const transform = `translate(${x}, ${y})`;

        return (
            <DraggableCore {...this.props} onStart={this.onDragStart} onDrag={this.onDrag} onStop={this.onDragStop}>
                {React.cloneElement(this.props.children, {
                    transform
                })}
            </DraggableCore>
        );
    }
}
