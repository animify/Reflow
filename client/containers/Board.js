import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { switchBoard } from './../store/actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    changeBoard: (id, entities) => dispatch(switchBoard(id, entities))
});

class Board extends PureComponent {
    render() {
        const { board, selected, id, changeBoard } = this.props;

        return (
            <Fragment>
                <div role="presentation" className={selected ? 'board selected' : 'board'} onClick={() => changeBoard(id, board.entities)}>
                    <h5>{board.title}</h5>
                </div>
            </Fragment>
        );
    }
}

Board.propTypes = {
    board: PropTypes.object.isRequired,
    changeBoard: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board);
