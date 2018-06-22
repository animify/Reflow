import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const parseValue = (unparsedValue, type) => {
    let inputValue = unparsedValue;

    switch (type) {
        case 'number':
            inputValue = parseFloat(inputValue);
            break;
    }

    return inputValue;
};

export default class Property extends Component {
    componentWillMount() {
        this.resetPropsState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.resetPropsState(nextProps);
    }

    resetPropsState = (props) => {
        const state = props.ownMap.nested ? props.ownMap.valueMap.reduce((o, v) => (o[v] = props.value[v] || 'Mixed', o), {}) : {
            [props.ownMap.valueMap]: props.value || 'Mixed'
        };
        this.setState(state)
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    commitValue = (val) => {
        const { ownMap, commitChange } = this.props;
        let input = this.state[val];
        const inputValue = parseValue(input, ownMap.type);

        if (ownMap.type === 'number' && (isNaN(inputValue) || !isFinite(inputValue))) {
            return this.resetPropsState(this.props);
        }

        const newValue = ownMap.nested ? {
            [val]: inputValue
        } : inputValue;

        commitChange(newValue, ownMap.nested);
    };

    render() {
        const { ownMap, prop, value } = this.props;

        return (
            <Fragment>
                <div className="property">
                    <label>
                        <h5>{ownMap.label}</h5>
                        <p>{JSON.stringify(value)}</p>
                        {ownMap.nested ? ownMap.valueMap.map((val, i) => (
                            <div className="input" key={`${prop}-${val}`}>
                                <label>
                                    <span>{ownMap.valueLabelMap[i]}</span>
                                    <input
                                        type="text"
                                        name={val}
                                        value={this.state[val]}
                                        onKeyPress={this.handleKeyPress}
                                        onChange={this.handleInputChange}
                                        onBlur={() => this.commitValue(val)}
                                    />
                                </label>
                            </div>
                        )) : <div className="input" key={`${prop}-${ownMap.valueMap}`}>
                                <label>
                                    <span>{ownMap.valueMap}</span>
                                    <input
                                        type="text"
                                        name={ownMap.valueMap}
                                        value={this.state[ownMap.valueMap]}
                                        onKeyPress={this.handleKeyPress}
                                        onChange={this.handleInputChange}
                                        onBlur={() => this.commitValue(ownMap.valueMap)}
                                    />
                                </label>
                            </div>}
                    </label>
                </div>
            </Fragment>
        );
    }
}

Property.propTypes = {
    ownMap: PropTypes.object.isRequired,
    prop: PropTypes.string.isRequired,
    commitChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.bool,
    ]).isRequired,
};
