import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Board from './Board';
import { setEntities } from '../../store/actions';
import store from '../../store';
import parser from '../../../parser';

const mapStateToProps = state => ({
    boardList: state.boards.byId,
    currentPage: state.doc.present.currentPage,
});

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, entities) => {
        const { entities: currentEntities, currentPage } = store.getState().doc.present;
        parser.sample.pages[currentPage].entities = currentEntities;
        dispatch(setEntities(id, entities));
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
    mapStateToProps,
    mapDispatchToProps
)(Boards);

