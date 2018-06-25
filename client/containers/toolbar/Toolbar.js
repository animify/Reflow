import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPresenting } from '../../store/actions';

const mapStateToProps = state => ({
    canvas: state.canvas,
});

const mapDispatchToProps = dispatch => ({
    togglePresenting: presenting => dispatch(setPresenting(presenting))
});

const Toolbar = ({ canvas, togglePresenting }) => (
    <section id="toolbar">
        <div className="item title">{canvas.title}</div>
        <div className="item scale">{(canvas.scale * 100).toFixed(2)}%</div>
        <div className="item group end">
            <span role="presentation" className={canvas.presenting ? 'button tiny' : 'button tiny selected'} onClick={() => togglePresenting(false)}>Editor</span>
            <span role="presentation" className={canvas.presenting ? 'button tiny selected' : 'button tiny'} onClick={() => togglePresenting(true)}>Player</span>
        </div>
    </section>
);

Toolbar.propTypes = {
    canvas: PropTypes.object.isRequired,
    togglePresenting: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);
