import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Board extends PureComponent {
    render() {
        const { board, selected, clickHandler } = this.props;

        return (
            <Fragment>
                <div role="presentation" className={selected ? 'layer selected' : 'layer'} onClick={selected ? null : clickHandler}>
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
