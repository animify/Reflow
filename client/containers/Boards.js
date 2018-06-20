import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';

const mapStateToProps = state => ({
    boards: state.boards.present,
});

const Boards = ({ boards }) => (
    <div id="boards">
        {
            Object.entries(boards.list).map(([id, board]) => (
                <Board key={id} id={id} board={board} selected={boards.currentPage === id} />
            ))
        }
    </div>
);

Boards.propTypes = {
    boards: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(Boards);

