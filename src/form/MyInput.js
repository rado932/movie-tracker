import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeGaps} from "../utils";

class MyInput extends Component {
    render() {
        const name = this.props.name || "";
        const nameNoGap = removeGaps(name);
        const value = this.props.value || "";
        const type = this.props.type || "text";
        const opts = this.props.opts || [];
        return (
            <div className="movie-description-item">
                <label className={`movie-${nameNoGap}`}>
                    <span className="fl w-30-1em">{name}</span>
                    <input className="fl w-70 my-input"
                           name={`movie-${nameNoGap}`}
                           type={type}
                           value={value}
                           onChange={this.props.onChange}
                           {...opts}/>
                </label>
            </div>
        )
    }
}

MyInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    opts: PropTypes.array.isRequired,
    type: PropTypes.string
};

export default MyInput;