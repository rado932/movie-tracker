import React, {Component} from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { removeGaps, humanName, formatOptions } from '../utils';

class MySelect extends Component {
    render() {
        let name = removeGaps(this.props.name); // remove spaces and convert to lower case
        let hName = humanName(this.props.name);
        let options = formatOptions(this.props.options);
        return (
            <div className="select fl w-50">
                <label>
                    <h3 className="select-label">{hName}</h3>
                    <Select
                        id={`select-${name}t`}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        autoFocus
                        options={options}
                        simpleValue
                        clearable={true}
                        name={`select-${name}`}
                        value={this.props.selected}
                        onChange={this.props.onChange}
                        placeholder={`Select ${hName}`}
                    />
                </label>
            </div>
        );
    }
}

MySelect.propTypes = {
    name: PropTypes.string.isRequired,
    selected: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MySelect;
