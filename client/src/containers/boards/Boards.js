import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { setEntities, toggleTest } from '../../store/actions';
import store from '../../store';
import parser from '../../../parser';
import { getCurrentTest, getCurrentPage, getBoardsOrder } from '../../selectors';
import { delay } from '../../../utils/helpers';
import { ActionCreators } from 'redux-undo';

const makeMapStateToProps = initialState => {
    const boardList = getBoardsOrder(initialState);
    return state => ({
        boardList,
        currentTest: getCurrentTest(state),
        currentPage: getCurrentPage(state)
    });
};

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, entities) => {
        const { entities: currentEntities, currentPage } = store.getState().doc.present;
        parser.sample.pages[currentPage].entities = currentEntities;
        dispatch(setEntities(id, entities));
    },
    switchTest: num => dispatch(toggleTest(num)),
});
let testRunning = false;

class Boards extends PureComponent {
    handleClick = (id, entities) => {
        this.props.changeBoard(id, entities);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTest === 20 && !testRunning) {
            testRunning = true;
            this.runBoardTests();
        }

        if (nextProps.currentTest === 21 && !testRunning) {
            testRunning = true;
            this.undoBoardTests();
        }
    }

    runBoardTests = async () => {
        for (const e in Array.from(Array(this.props.boardList.length))) {
            this.goToNextBoard();
            await delay(120);
        }

        testRunning = false;
        this.props.switchTest(21);
    }

    undoBoardTests = async () => {
        for (const e in Array.from(Array(this.props.boardList.length))) {
            store.dispatch(ActionCreators.undo());
            await delay(120);
        }

        testRunning = false;
        this.props.switchTest(0);
    }

    goToNextBoard = () => {
        const currentState = store.getState();
        const currentPage = currentState.doc.present.currentPage;
        const currentBoardIndex = this.props.boardList.findIndex(b => b === currentPage);
        const nextBoardIndex = currentBoardIndex >= this.props.boardList.length - 1 ? 0 : currentBoardIndex + 1;
        const nextBoardId = this.props.boardList[nextBoardIndex];
        const nextBoardEntities = currentState.boards.all[nextBoardId].entities;
        this.props.changeBoard(nextBoardId, nextBoardEntities);
    }

    render() {
        const { boardList, currentPage } = this.props;

        return (
            <Fragment>
                <h5 className="layer-heading">Boards</h5>
                <div className="layers">
                    {boardList.map(id => (
                        <Board key={`board-${id}`} boardId={id} selected={currentPage === id} clickHandler={this.handleClick} />
                    ))}
                </div>
            </Fragment>
        );
    }
}

Boards.propTypes = {
    boardList: PropTypes.array.isRequired,
    currentPage: PropTypes.string.isRequired,
    changeBoard: PropTypes.func.isRequired,
};

export default connect(
    makeMapStateToProps,
    mapDispatchToProps
)(Boards);

