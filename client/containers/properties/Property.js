import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Property = ({ ownMap, prop, value, change }) => {
    const parseValue = (unparsedValue, type) => {
        let inputValue = unparsedValue;

        switch (type) {
            case 'number':
                inputValue = parseFloat(inputValue);
                break;
        }

        return inputValue;
    };

    const handleNewValue = (e, val, nested) => {
        let input = e.target.value;
        console.log(input);
        if (input === null) {
            input = 0;
        }

        const inputValue = parseValue(input, ownMap.type);
        console.log('inputValue', inputValue);
        const newValue = nested ? {
            [val]: inputValue
        } : inputValue;
        change(newValue);
    };

    const PropInput = ({ label, val, nested }) => (
        <div className="input">
            <label>
                <span>{label}</span>
                <input
                    type="text"
                    value={val || 'Mixed'}
                    onChange={e => handleNewValue(e, val, nested)}
                />
            </label>
        </div>
    );

    return (
        <Fragment>
            <div className="property">
                <label>
                    <h5>{ownMap.label}</h5>
                    <p>{JSON.stringify(value)}</p>
                    {Array.isArray(ownMap.valueMap) ? ownMap.valueMap.map((val, i) => (
                        <PropInput key={`${prop}-${val}`} label={ownMap.valueLabelMap[i]} val={value[val]} nested />
                    )) : <PropInput label={ownMap.valueLabelMap} val={value.toString()} />}
                </label>
            </div>
        </Fragment>
    );
};

Property.propTypes = {
    ownMap: PropTypes.object.isRequired,
    prop: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.bool,
    ]).isRequired,
};

export default Property;
