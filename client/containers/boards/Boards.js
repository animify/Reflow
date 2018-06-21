import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { switchBoard } from '../../store/actions';

const mapStateToProps = state => ({
    boards: state.boards.present,
});

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, entities) => dispatch(switchBoard(id, entities))
});

const Boards = ({ boards, changeBoard }) => (
    <div id="boards">
        {
            Object.entries(boards.list).map(([id, board]) => (
                <Board key={id} board={board} selected={boards.currentPage === id} click={() => changeBoard(id, board.entities)} />
            ))
        }
    </div>
);

Boards.propTypes = {
    boards: PropTypes.object.isRequired,
    changeBoard: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Boards);

