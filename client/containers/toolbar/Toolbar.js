import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPresenting } from '../../store/actions';

const mapStateToProps = state => ({
    title: state.canvas.title,
    scale: state.canvas.scale,
    presenting: state.canvas.presenting,
});

const mapDispatchToProps = dispatch => ({
    toggleEditorMode: () => dispatch(setPresenting(false)),
    togglePresentationMode: () => dispatch(setPresenting(true)),
});

class Toolbar extends PureComponent {
    render() {
        const { title, scale, toggleEditorMode, togglePresentationMode, presenting } = this.props;
        return (
            <section id="toolbar">
                <div className="item title">{title}</div>
                <div className="item scale">{(scale * 100).toFixed(2)}%</div>
                <div className="item group end">
                    <span role="presentation" className={presenting ? 'button tiny' : 'button tiny selected'} onClick={toggleEditorMode}>Editor</span>
                    <span role="presentation" className={presenting ? 'button tiny selected' : 'button tiny'} onClick={togglePresentationMode}>Player</span>
                </div>
            </section>
        );
    }
}

Toolbar.propTypes = {
    title: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    presenting: PropTypes.bool.isRequired,
    toggleEditorMode: PropTypes.func.isRequired,
    togglePresentationMode: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);
