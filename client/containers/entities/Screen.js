import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import produce from 'immer';

export default class Screen extends Component {
    constructor() {
        super();

        this.hoverInnerElement = this.hoverInnerElement.bind(this);
    }

    componentWillMount() {
        this.setState({
            innerElements: this.props.entity.innerElements
        });
    }

    shouldComponentUpdate(nextProps) {
        return this.props.entity.id !== nextProps.entity.id;
    }

    hoverInnerElement(id, payload) {
        this.setState(produce((draft) => {
            draft.innerElements[draft.innerElements.findIndex(e => e.id === id)].hovering = payload;
        }));
    }

    render() {
        const { entity, hovering, isPresenting } = this.props;
        const { innerElements } = this.state;

        return (
            <Fragment>
                <image xlinkHref={entity.source.id} />
                {(!isPresenting && hovering) && innerElements.map(ie => (
                    <rect
                        key={ie.id}
                        x={ie.x}
                        y={ie.y}
                        width={ie.w}
                        height={ie.h}
                        onMouseEnter={() => this.hoverInnerElement(ie.id, true)}
                        onMouseLeave={() => this.hoverInnerElement(ie.id, false)}
                        style={{
                            stroke: ie.hovering ? 'red' : 'none',
                            strokeWidth: 1,
                            fill: 'transparent',
                            width: ie.w,
                            height: ie.h
                        }}
                    />
                ))}
            </Fragment>
        );
    }
}

Screen.propTypes = {
    entity: PropTypes.object.isRequired,
    hovering: PropTypes.bool.isRequired,
    isPresenting: PropTypes.bool.isRequired,
};
