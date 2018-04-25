import React, {Component} from 'react';
import PropTypes from "prop-types";

class MovieTile extends Component {
    render() {
        const nameStr = this.props.name || "";
        const genreStr = this.props.genre.toString() || "";
        const yearStr= typeof this.props.year !== "undefined"? this.props.year.toString() : "";
        const imageUrl = this.props.imageUrl || "";
        const classN = this.props.classN || "";
        return (
            <div onClick={() => this.props.onClick(this.props.id)} className={`movie-tile fl w-100 ${classN}`}>
                <div className="fl w-20">
                    <img className="movie-tile-poster" src={imageUrl}/>
                </div>
                <div className="movie-tile-details fl w-80">
                    <div className="movie-tile-name">{nameStr}</div>
                    <div className="movie-tile-genre">{genreStr}</div>
                    <div className="movie-tile-year">{yearStr}</div>
                </div>
                <br/>
            </div>
        );
    }
}

MovieTile.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default MovieTile;
