import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from '../src/App';
import {mount} from "enzyme";
import {
    saveMovieData,
    saveMoviesData,
    updateYear,
    updateGenre,
    updateSelectedId,
    SAVE_MOVIES_DATA, UPDATE_SELECTED_YEAR, UPDATE_SELECTED_GENRE, UPDATE_SELECTED_ID, SAVE_MOVIE_DATA
} from "../src/actions";


describe('Mount + wrapping in <Provider>',()=>{
    const movies = [{
        id: 0,
        name: "Movie Test",
        year: 1970,
        genre: ["Test1", "Test2"],
        imageUrl: "https://example.com/test.jpg",
        description: "This is a long description of a movie that has a title. a24gyhr4"
    }, {
        id: 1,
        name: "Movie Test 1",
        year: 1970,
        genre: ["Test1", "Test3"],
        imageUrl: "https://example.com/test2.jpg",
        description: "This is a long description of a movie that has a title."
    }];
    const initialState = {
        moviesData: {
            movies: movies,
            genres: ["Test1", "Test2", "Test3"],
            years: [1970]
        },
        selectedGenre: null,
        selectedYear: null,
        selectedId: null
    };
    let store,wrapper;
    const mockStore = configureStore();
    fetch.mockResponse(JSON.stringify(movies)); // so it doesn't crash when trying to fetch data, any fetch changes are being ignored

    beforeEach(()=>{
        store = mockStore(initialState);
        wrapper = mount( <Provider store={store}><App /></Provider> )
    });

    test('check properties initial state', () => {
        const App = wrapper.find("App");
        expect(App.prop('moviesData')).toEqual(initialState.moviesData);
        expect(App.prop('selectedGenre')).toBe(initialState.selectedGenre);
        expect(App.prop('selectedYear')).toBe(initialState.selectedYear);
        expect(App.prop('selectedId')).toBe(initialState.selectedId);
    });

    test('check action on dispatching ', () => {
        // WHEN there were events fired
        store.dispatch(saveMovieData(movies[0]));
        store.dispatch(saveMoviesData(movies));
        store.dispatch(updateYear(1970));
        store.dispatch(updateGenre("Test2"));
        store.dispatch(updateSelectedId(1));

        // THEN check if they appeared in the actions
        const action = store.getActions();
        expect(action[0].type).toBe(SAVE_MOVIES_DATA); // the initial one done after render and .fetch
        expect(action[1].type).toBe(SAVE_MOVIE_DATA);
        expect(action[2].type).toBe(SAVE_MOVIES_DATA);
        expect(action[3].type).toBe(UPDATE_SELECTED_YEAR);
        expect(action[4].type).toBe(UPDATE_SELECTED_GENRE);
        expect(action[5].type).toBe(UPDATE_SELECTED_ID);
    });

});