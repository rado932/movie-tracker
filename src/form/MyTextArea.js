import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {removeGaps} from "../utils";

class MyTextArea extends Component {
    render() {
        const name = this.props.name || "";
        const nameNoGap = removeGaps(name);
        const value = this.props.value || "";
        const opts = this.props.opts || [];
        return (
            <div>
                <label className={`movie-${nameNoGap}`}>
                    <span className="fl w-30-1em">{name}</span>
                    <textarea className="fl w-70"
                              name={`movie-${nameNoGap}`}
                              value={value}
                              onChange={this.props.onChange}
                              {...opts}/>
                </label>
            </div>
        )
    }
}

MyTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    opts: PropTypes.array.isRequired
};

export default MyTextArea;