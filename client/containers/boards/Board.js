import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Board extends PureComponent {
    render() {
        const { board, selected, click } = this.props;

        return (
            <Fragment>
                <div role="presentation" className={selected ? 'board selected' : 'board'} onClick={click}>
                    <h5>{board.title}</h5>
                </div>
            </Fragment>
        );
    }
}

Board.propTypes = {
    board: PropTypes.object.isRequired,
    click: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};
