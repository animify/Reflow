import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPresenting } from '../../store/actions';
import { getScale, getTitle, getIsPresenting } from '../../selectors';

const mapStateToProps = state => ({
    title: getTitle(state),
    scale: getScale(state),
    isPresenting: getIsPresenting(state),
});

const mapDispatchToProps = dispatch => ({
    toggleEditorMode: () => dispatch(setPresenting(false)),
    togglePresentationMode: () => dispatch(setPresenting(true)),
});

class Toolbar extends PureComponent {
    render() {
        const { title, scale, toggleEditorMode, togglePresentationMode, isPresenting } = this.props;
        return (
            <section id="toolbar">
                <div className="item title">{title}</div>
                <div className="item scale">{(scale * 100).toFixed(2)}%</div>
                <div className="item group end">
                    <span role="presentation" className={isPresenting ? 'button tiny' : 'button tiny selected'} onClick={toggleEditorMode}>Editor</span>
                    <span role="presentation" className={isPresenting ? 'button tiny selected' : 'button tiny'} onClick={togglePresentationMode}>Player</span>
                </div>
            </section>
        );
    }
}

Toolbar.propTypes = {
    title: PropTypes.string.isRequired,
    scale: PropTypes.number.isRequired,
    isPresenting: PropTypes.bool.isRequired,
    toggleEditorMode: PropTypes.func.isRequired,
    togglePresentationMode: PropTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);
