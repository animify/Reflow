import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Property from './Property';
import { filterCommonProperties } from '../../utils/filterFns';
import { updateEntity } from '../../store/actions';

const properties = {
    fillColor: {
        label: 'Fill',
        type: 'string',
        valueMap: 'fillColor',
        valueLabelMap: 'Fill',
    },
    opacity: {
        label: 'Opacity',
        type: 'number',
        valueMap: 'opacity',
        valueLabelMap: 'Opacity',
    },
    locked: {
        label: 'Locked',
        type: 'number',
        valueMap: 'locked',
        valueLabelMap: 'Locked',
    },
    position: {
        label: 'Position',
        type: 'number',
        nested: true,
        valueMap: ['x', 'y'],
        valueLabelMap: ['X', 'Y'],
    },
    size: {
        label: 'Size',
        type: 'number',
        nested: true,
        valueMap: ['w', 'h'],
        valueLabelMap: ['W', 'H'],
    },
};

const mapStateToProps = state => ({
    entities: state.doc.present.entities,
    selected: state.doc.present.selected
});

const mapDispatchToProps = (dispatch) => ({
    propChange: (id, payload) => dispatch(updateEntity(id, payload))
});

class PropertiesPane extends PureComponent {
    onChange = (selectedEntities, key, newValue, nested) => {
        selectedEntities.forEach((entity) => {
            const val = nested ? {
                [key]: {
                    ...entity[key],
                    ...newValue
                }
            } : {
                    [key]: newValue
                }

            this.props.propChange(`${entity.type}${entity.id}`, val);
        });
    }

    render() {
        const { entities, selected } = this.props;
        const selectedEntities = Object.values(entities).filter(e => selected.includes(`${e.type}${e.id}`))
        const { common, different } = filterCommonProperties(selectedEntities, properties);

        different.forEach(p => {
            const newValue = properties[p].valueMap.length === 1 ? null : properties[p].valueMap.reduce((o, v) => {
                o[v] = undefined;
                return o;
            }, {})
            common[p] = newValue
        });
        const commonProps = Object.entries(common);
        // console.log(common, different);

        return (
            <Fragment>
                {commonProps.length > 0 && (<div id="properties">
                    {commonProps.map(([key, value]) => (
                        <Property key={key} ownMap={properties[key]} prop={key} value={value} commitChange={(newValue, nested) => this.onChange(selectedEntities, key, newValue, nested)} />
                    ))}
                </div>)}
            </Fragment>
        );
    }
}

PropertiesPane.propTypes = {
    entities: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PropertiesPane);

