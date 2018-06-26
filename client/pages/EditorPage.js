
import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { HotKeys } from 'react-hotkeys';
import PropTypes from 'prop-types';
import Canvas from '../containers/Canvas';
import PropertiesPane from '../containers/properties/PropertiesPane';
import Toolbar from '../containers/toolbar/Toolbar';
import LeftPanel from '../containers/leftPanel/LeftPanel';
import { duplicateSelected } from '../store/actions';
import Keys from '../utils/hotkeys';

const keyMap = {
    duplicate: 'mod+d',
    undo: 'mod+z',
    redo: 'mod+shift+z',
    mod: 'mod',
    commandDown: { sequence: 'mod', action: 'keydown' },
    commandUp: { sequence: 'mod', action: 'keyup' },
    optionDown: { sequence: 'alt', action: 'keydown' },
    optionUp: { sequence: 'alt', action: 'keyup' },
};

const keyHandlers = {
    commandDown: () => {
        Keys.cmdPressed = true;
    },
    commandUp: () => {
        Keys.cmdPressed = false;
    },
    optionDown: () => {
        Keys.optionPressed = true;
    },
    optionUp: () => {
        Keys.optionPressed = false;
    },
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    onUndo: () => dispatch(ActionCreators.undo()),
    onRedo: () => dispatch(ActionCreators.redo()),
    onDuplicate: () => dispatch(duplicateSelected()),
});

const EditorPage = ({ onUndo, onRedo, onDuplicate }) => {
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
            <Toolbar />
            <LeftPanel />
            <Canvas />
            {/* <PropertiesPane /> */}
        </HotKeys>
    );
};

EditorPage.propTypes = {
    onUndo: PropTypes.func.isRequired,
    onRedo: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorPage);
