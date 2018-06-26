import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { setEntities } from '../../store/actions';
import store from '../../store';
import parser from '../../parser';

const mapStateToProps = state => ({
    boardList: state.boards.byId,
    currentPage: state.doc.present.currentPage,
});

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, currentPage, entities) => {
        parser.sample.pages[currentPage].entities = store.getState().doc.present.entities;
        dispatch(setEntities(id, entities));
    }
});

const Boards = ({ boardList, changeBoard, currentPage }) => {
    const handleClick = (id, entities) => {
        changeBoard(id, currentPage, entities);
    };

    return (
        <Fragment>
            <h5 className="layer-heading">Boards</h5>
            <div className="layers">
                {boardList.map(id => (
                    <Board key={`board-${id}`} boardId={id} selected={currentPage === id} clickHandler={handleClick} />
                ))}
            </div>
        </Fragment>
    );
};

Boards.propTypes = {
    boardList: PropTypes.array.isRequired,
    currentPage: PropTypes.string.isRequired,
    changeBoard: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Boards);

