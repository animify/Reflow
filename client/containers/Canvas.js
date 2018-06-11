import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Entities from './Entities';
import { mouseEnter } from '../store/actions';
import Frames from './Frames';

const mapStateToProps = state => ({
    entities: state.entities,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onMouseEnter: () => dispatch(mouseEnter(ownProps.entity))
});

const Canvas = ({ entities }) => (
    <div className="renderer">
        <svg id="renderer" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" xmlnsXlink="http://www.w3.org/1999/xlink">
            <g id="renderer-controller">
                <Entities entities={entities} />
                <Frames entities={entities} />
            </g>
        </svg>
    </div>
);

Canvas.propTypes = {
    entities: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

