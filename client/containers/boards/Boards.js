import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { setEntities } from '../../store/actions';

const mapStateToProps = state => ({
    boards: state.boards,
    currentPage: state.doc.present.currentPage,
});

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, entities) => dispatch(setEntities(id, entities))
});

const Boards = ({ boards, changeBoard, currentPage }) => (
    <Fragment>
        <h5 className="layer-heading">Boards</h5>
        <div className="layers">
            {Object.entries(boards.list).map(([id, board]) => (
                <Board key={id} board={board} selected={currentPage === id} clickHandler={() => changeBoard(id, board.entities)} />
            ))}
        </div>
    </Fragment>
);

Boards.propTypes = {
    boards: PropTypes.object.isRequired,
    currentPage: PropTypes.string.isRequired,
    changeBoard: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Boards);

