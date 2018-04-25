import React, {Component} from 'react';
import { connect } from 'react-redux'
import MySelect from "./form/MySelect";
import { updateGenre, updateYear, saveMovieData, saveMoviesData, updateSelectedId } from './actions';
import { getMoviesAPI, putMovieAPI } from "./api/MockMoviesAPI";
import MovieTile from "./MovieTile";
import MovieDetails from "./MovieDetails";

// css
import './css/App.css';
import 'tachyons/css/tachyons.min.css'
import 'react-select/dist/react-select.css';
import "./css/MovieTiles.css";
import "./css/MovieDetails.css";
import NewMovieTile from "./NewMovieTile";

const initMovie = {
    id: -1,
    name: "",
    year: -1,
    genre: [],
    imageUrl: "",
    description: ""
};

const mapStateToProps = state => {
    return {
        moviesData: state.moviesData,
        selectedGenre: state.selectedGenre,
        selectedYear: state.selectedYear,
        selectedId: state.selectedId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveMovieData: movieData => {
            dispatch(saveMovieData(movieData))
        },
        saveMoviesData: moviesData => {
            dispatch(saveMoviesData(moviesData));
        },
        onGenreChange: genre => {
            dispatch(updateGenre(genre))
        },
        onYearChange: year => {
            dispatch(updateYear(year))
        },
        onSelectedIdChange: id => {
            dispatch(updateSelectedId(id))
        }
    }
};

class App extends Component {
    componentWillMount() {
        getMoviesAPI(this.props.saveMoviesData);
    }
    getSelectedMovie(id) {
        if (!id || typeof id !== "number") return null;
        if (id < 0) return Object.assign(initMovie);
        return this.props.moviesData.movies.find(movie => movie.id === id);
    }
    render() {
        const selectedGenre = this.props.selectedGenre;
        const selectedYear = this.props.selectedYear;
        const selectedId = this.props.selectedId;
        const selectedYearNumber = parseInt(selectedYear, 10);

        // filter only the visible elements based on the selected filter options
        // create a MovieTile for each visible element
        const visibleMovieTiles = this.props.moviesData.movies
            .filter(
                movie => {
                    return (selectedGenre == null || movie.genre.includes(selectedGenre)) &&
                    (selectedYear == null || movie.year === selectedYearNumber);})
            .map( visibleElm =>
                <MovieTile
                    classN={selectedId === visibleElm.id ? "active-tile" : ""}
                    key={`movie-${visibleElm.id}`}
                    id={visibleElm.id}
                    name={visibleElm.name}
                    imageUrl={visibleElm.imageUrl}
                    genre={visibleElm.genre}
                    year={visibleElm.year}
                    onClick={this.props.onSelectedIdChange}/>);

        // get the selected movie, if any
        const selectedMovie = this.getSelectedMovie(this.props.selectedId);
        const newMovie = this.props.selectedId < 0;
        const submitButtonName = newMovie ? "Save" : "Edit";

        const editMovie = (movie) => putMovieAPI(movie, this.props.saveMovieData);
        return (
            <div className="App">
                <form className="form-search">
                    <MySelect
                        name="Genre"
                        selected={selectedGenre}
                        options={this.props.moviesData.genres}
                        onChange={this.props.onGenreChange}/>
                    <MySelect
                        name="Years"
                        selected={selectedYear}
                        options={this.props.moviesData.years}
                        onChange={this.props.onYearChange}/>
                </form>
                <div className="movie-tiles fl w-30">
                    {visibleMovieTiles}
                    <NewMovieTile onClick={this.props.onSelectedIdChange}/>
                </div>
                <div className="movie-details fl w-70">
                    <MovieDetails movie={selectedMovie} editMovie={editMovie} inEditMode={newMovie} submitButtonName={submitButtonName}/>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
