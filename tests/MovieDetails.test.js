import React from 'react';
import { shallow } from 'enzyme';
import MovieDetails from '../src/MovieDetails';

const editToggleClass = ".edit-checkbox";
const editToggleOnClass = ".edit-active";
const descriptionDivClass = ".movie-description-div";

test('render MovieDetails', () => {
    // GIVEN
    const movie = {
        id: 0,
        name: "Movie Test",
        year: 1970,
        genre: ["Test1", "Test2"],
        imageUrl: "https://example.com/test.jpg",
        description: "This is a long description of a movie that has a title. a24gyhr4"
    };
    const onEditMovie = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(movie, onEditMovie);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, movie);
});

test('render MovieDetails with empty properties', () => {
    // GIVEN
    const movie = {
        id: 0,
        name: "",
        year: 0,
        genre: [],
        imageUrl: "",
        description: ""
    };
    const onEditMovie = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(movie, onEditMovie);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, movie);
});

test('render MovieDetails with editMode on', () => {
    // GIVEN
    const movie = {
        id: 0,
        name: "Movie Test",
        year: 1970,
        genre: ["Test1", "Test2"],
        imageUrl: "https://example.com/test.jpg",
        description: "This is a long description of a movie that has a title. a24gyhr4"
    };
    const onEditMovie = jest.fn();
    const inEditMode = true;

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(movie, onEditMovie, inEditMode);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, movie, inEditMode);
});

const getWrapper = (movie, onEditMovie, inEditMode) => {
    return shallow(
        <MovieDetails
            inEditMode={inEditMode}
            editMovie={onEditMovie}
            movie={movie}/>
    );
};

function inspectObjectWrapper(wrapper, movie, editModeOn) {
    expect(wrapper.html()).not.toHaveLength(0);

    const editToggle = wrapper.find(editToggleClass);
    expect(editToggle).toHaveLength(1);
    if (editModeOn) {
        expect(wrapper.find("MyInput")).toHaveLength(4);
        expect(wrapper.find("MyTextArea")).toHaveLength(1);
        expect(wrapper.find('[type="submit"]')).toHaveLength(1);
        expect(wrapper.find(editToggleOnClass)).toHaveLength(1);
    } else {
        expect(wrapper.find("MyInput")).toHaveLength(3);
        expect(wrapper.find(descriptionDivClass)).toHaveLength(1);
        expect(wrapper.find(".movie-poster").html()).toContain(movie.imageUrl);
        expect(wrapper.find(editToggleOnClass)).toHaveLength(0);
    }
    const wrapperHtml = wrapper.html();
    expect(wrapperHtml).toContain(movie.name);
    expect(wrapperHtml).toContain(movie.genre.toString());
    expect(wrapperHtml).toContain(movie.year);
    expect(wrapperHtml).toContain(movie.description);
}