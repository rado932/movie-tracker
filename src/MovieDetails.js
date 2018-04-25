import React, {Component} from 'react';
import PropTypes from "prop-types";
import MyInput from "./form/MyInput";
import MyTextArea from "./form/MyTextArea";
import {removeGaps} from "./utils";

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModeOn: props.inEditMode || false,
            movie: props.movie
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onGenreChange = this.onGenreChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.movie !== null && (this.state.movie === null || nextProps.movie.id !== this.state.movie.id)) {
            this.setState({
                editModeOn: nextProps.inEditMode || false,
                movie: nextProps.movie
            });
        }
    }

    setEditMode(editMode) {
        if (typeof editMode !== "boolean") return;
        this.setState({
            editModeOn: editMode
        });
    }
    onNameChange(e) {
        this.setState({
            movie: Object.assign({}, this.state.movie, {name: e.target.value})
        });
    }
    onYearChange(e) {
        this.setState({
            movie: Object.assign({}, this.state.movie, {year: e.target.value})
        });
    }
    onGenreChange(e) {
        this.setState({
            movie: Object.assign({}, this.state.movie, {genre: e.target.value})
        });
    }
    onDescriptionChange(e) {
        this.setState({
            movie: Object.assign({}, this.state.movie, {description: e.target.value})
        });
    }
    onImageUrlChange(e) {
        this.setState({
            movie: Object.assign({}, this.state.movie, {imageUrl: e.target.value})
        });
    }
    onSubmit(event) {
        event.preventDefault();

        let movie = this.state.movie;
        if(typeof movie.genre === "string") {
            movie.genre = removeGaps(movie.genre).split(",");
        }
        movie.year = parseInt(movie.year, 10);
        this.props.editMovie(movie); // mock call to API

        this.setState({
            editModeOn: false
        });
    }

    render() {
        let inputOpts = []; // used to store readonly
        let editClassNames = " edit-active"; // used to show a toggle for the edit option
        let divClassName = " w-100";
        let rendered = null; // stores a part of the rendered page elements
        let movie = this.state.movie; // stores the movie in the state so changes can be saved without sending the form

        if (movie !== null) {
            if (!this.state.editModeOn) {
                // edit mode is not initiated
                inputOpts['readOnly'] = 'readOnly'; // elements should be readonly
                editClassNames = ""; // the edit icon should not be toggled
                divClassName = " w-80"
            }
            const name = movie.name || "";
            const genreStr = movie.genre.toString() || "";
            const yearStr= movie.year < 0 ? "" : movie.year.toString();
            const imageUrl = movie.imageUrl || "";
            const description = movie.description || "";
            const submitButtonName = this.props.submitButtonName || "Edit";

            rendered = (
                <form className="movie-details-form" onSubmit={this.onSubmit}>
                    <div className="fl w-100">
                        {!this.state.editModeOn &&
                            // show the poster if not editing
                            <div className="fl w-20">
                                <img className="movie-poster" src={imageUrl}/>
                            </div>
                        }
                        <div className={`fl${divClassName}`}>
                            <MyInput name="Name" value={name} opts={inputOpts} onChange={this.onNameChange}/>
                            <MyInput name="Genre" value={genreStr} opts={inputOpts} onChange={this.onGenreChange}/>
                            {!this.state.editModeOn &&
                                // show the year input as text if not editing
                                <MyInput name="Year" type="text" value={yearStr} opts={inputOpts} onChange={this.onYearChange}/>
                            }
                            {this.state.editModeOn &&
                                <React.Fragment>
                                    <MyInput name="Year" type="number" value={yearStr} opts={inputOpts} onChange={this.onYearChange}/>
                                    <MyInput name="ImageUrl" value={imageUrl} opts={inputOpts} onChange={this.onImageUrlChange}/>
                                    <MyTextArea name="Description" value={description} opts={inputOpts} onChange={this.onDescriptionChange}/>
                                    <input className="edit-submit-button" type="submit" value={submitButtonName}/>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                    {!this.state.editModeOn &&
                        // show the movie description in a div if not editing
                        <div className="movie-description-div">{description}</div>
                    }
                </form>
            )
        }
        return (
            <React.Fragment>
                {movie !== null &&
                    <React.Fragment>
                        <label className="edit-checkbox-label">
                            <i className={`fas fa-edit edit-checkbox${editClassNames}`}
                               onClick={() => this.setEditMode(!this.state.editModeOn)}
                               title="Toggle Edit Movie Data"/>
                        </label>
                        <br/>
                        {rendered}
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

MovieDetails.protoTypes = {
    inEditMode: PropTypes.bool,
    submitButtonName: PropTypes.string,
    editMovie: PropTypes.func.isRequired,
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        genre: PropTypes.array.isRequired,
        year: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
    })
};

export default MovieDetails;
