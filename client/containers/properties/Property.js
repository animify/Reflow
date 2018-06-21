import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Property = ({ ownMap, prop, value, change }) => {
    const parseValue = (unparsedValue, type) => {
        let inputValue = unparsedValue;

        switch (type) {
            case 'number':
                inputValue = parseInt(inputValue, 10);
                break;
        }

        return inputValue;
    };

    const handleNewValue = (e, val) => {
        const inputValue = parseValue(e.target.value, ownMap.type);
        const newValue = {
            ...value,
            [val]: inputValue
        };

        change(newValue);
    };

    return (
        <Fragment>
            <div className="property">
                <label>
                    <h5>{ownMap.label}</h5>
                    <p>{JSON.stringify(value)}</p>
                    {ownMap.valueMap && ownMap.valueMap.map((val, i) => (
                        <div className="input" key={`${prop}-${val}`}>
                            <label>
                                <span>{ownMap.valueLabelMap[i]}</span>
                                <input
                                    type={ownMap.type}
                                    value={value[val] || value}
                                    step="0.1"
                                    onChange={e => handleNewValue(e, val)}
                                />
                            </label>
                        </div>
                    ))}
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
