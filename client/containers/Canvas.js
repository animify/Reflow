import React from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { ActionCreators } from 'redux-undo';
// import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import PropTypes from 'prop-types';
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


const Canvas = ({ entities, onUndo, onRedo }) => {
    const handlers = {
        undo: onUndo,
        redo: onRedo
    };

    return (
        <HotKeys keyMap={keyMap} handlers={handlers}>
            <div className="renderer">
                <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <g id="renderer-controller">
                        <Entities entities={entities} />
                        <Frames entities={entities} />
                    </g>
                </svg>
            </div>
        </HotKeys>
    );
};

Canvas.propTypes = {
    entities: PropTypes.object.isRequired,
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

