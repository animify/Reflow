import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import parser from '../../parser';

const makeMapStateToProps = (initialState, initialProps) => {
    const { boardId } = initialProps;
    const mapStateToProps = state => {
        const board = state.boards.all[boardId];
        return {
            board,
        };
    };
    return mapStateToProps;
};

class Board extends PureComponent {
    onClick = () => {
        if (this.props.selected) {
            return false;
        }
        this.props.clickHandler(this.props.boardId, parser.sample.pages[this.props.boardId].entities)
    }

    render() {
        const { board, selected } = this.props;

        return (
            <Fragment>
                <div role="presentation" className={selected ? 'layer selected' : 'layer'} onClick={this.onClick}>
                    <span>{board.title}</span>
                </div>
            </Fragment>
        );
    }
}

Board.propTypes = {
    board: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};


export default connect(
    makeMapStateToProps,
)(Board);
