import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { setEntities } from '../../store/actions';
import store from '../../store';
import parser from '../../../parser';
import { getCurrentTest, getCurrentPage, getBoardsOrder } from '../../selectors';

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
        dispatch(setEntities(id, entities));
        parser.sample.pages[currentPage].entities = currentEntities;
    }
});

class Boards extends PureComponent {
    handleClick = (id, entities) => {
        this.props.changeBoard(id, entities);
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

