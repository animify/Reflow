import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

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

    hoverInnerElement(ie) {
        const { innerElements } = this.state;
        const innerElement = this.state.innerElements.findIndex(e => e.id === ie.id);

        innerElements[innerElement].hovering = true;

        console.log(innerElements[innerElement]);
        this.setState({
            innerElements
        });
    }

    render() {
        const { entity } = this.props;
        const { innerElements } = this.state;
        return (
            <Fragment>
                <image width={entity.size.w} height={entity.size.h} xlinkHref={entity.source.id} />
                {entity.hovering && innerElements.map(ie => (
                    <rect
                        key={ie.id}
                        x={ie.x}
                        y={ie.y}
                        width={ie.w}
                        height={ie.h}
                        onMouseEnter={() => this.hoverInnerElement(ie)}
                        style={{
                            stroke: ie.hovering ? 'red' : 'none',
                            strokeWidth: 2,
                            fill: 'rgba(0,0,0,.1)',
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
};
