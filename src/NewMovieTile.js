import React, {Component} from 'react';
import PropTypes from "prop-types";

class NewMovieTile extends Component {
    render() {
        return (
            <div onClick={() => this.props.onClick(-1)} className="movie-tile new-movie-tile fl w-100">
                +
            </div>
        );
    }
}

NewMovieTile.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default NewMovieTile;
