import React from 'react';
import { shallow } from 'enzyme';
import MovieTile from '../src/MovieTile';

const movieTileClass = ".movie-tile";
const nameClass = ".movie-tile-name";
const yearClass = ".movie-tile-year";
const genreClass = ".movie-tile-genre";

test('render MovieTile', () => {
    // GIVEN
    const id = 0;
    const name = "Movie Test";
    const imageUrl = "https://example.com/test.jpg";
    const genre = ["Test1", "Test2"];
    const year = 1970;
    const onClick = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(id, name, imageUrl, genre, year, onClick);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, genre.toString(), year.toString(), imageUrl);
});

test('render MovieTile with empty properties', () => {
    // GIVEN
    const id = 0;
    const name = "";
    const imageUrl = "";
    const genre = [];
    const year = 0;
    const onClick = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(id, name, imageUrl, genre, year, onClick);

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, genre.toString(), year.toString(), imageUrl);
});

test('render MovieTile and simulate click', () => {
    // GIVEN
    const id = 0;
    const name = "Movie Test";
    const imageUrl = "https://example.com/test.jpg";
    const genre = ["Test1", "Test2"];
    const year = 1970;
    const onClick = jest.fn();

    // WHEN MovieTitle is rendered with the data
    const wrapper = getWrapper(id, name, imageUrl, genre, year, onClick);
    // AND simulate a click event
    wrapper.find(movieTileClass).simulate('click');

    // THEN it should contain all the information
    inspectObjectWrapper(wrapper, name, genre.toString(), year.toString(), imageUrl);
    expect(onClick).toHaveBeenCalledTimes(1);
});

const getWrapper = (id, name, imageUrl, genre, year, onClick) => {
    return shallow(
        <MovieTile id={id}
                   name={name}
                   imageUrl={imageUrl}
                   genre={genre}
                   year={year}
                   onClick={onClick}/>
    );
};

function inspectObjectWrapper(wrapper, nameStr, genreStr, yearStr, imageUrlStr) {
    expect(wrapper.html()).not.toHaveLength(0);

    const name = wrapper.find(nameClass);
    expect(name).toHaveLength(1);
    expect(name.text()).toBe(nameStr);

    const genre = wrapper.find(genreClass);
    expect(genre).toHaveLength(1);
    expect(genre.text()).toBe(genreStr);

    const year = wrapper.find(yearClass);
    expect(year).toHaveLength(1);
    expect(year.text()).toBe(yearStr);

    const img = wrapper.find("img");
    expect(img).toHaveLength(1);
    expect(img.props().src).toBe(imageUrlStr);
}
