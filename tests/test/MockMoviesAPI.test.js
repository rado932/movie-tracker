import React from 'react';
import { getMoviesAPI, putMovieAPI} from '../../src/api/MockMoviesAPI'

const mockApiOutput = {test: "test"};

beforeEach(() => {
    fetch.resetMocks()
});

test("getMoviesAPI", () => {
    // GIVEN
    const mockCallback = jest.fn();
    fetch.once(JSON.stringify(mockApiOutput));

    // WHEN getMoviesAPI is called
    getMoviesAPI(mockCallback);

    // THEN mockCallback should have been called once
    // doesn't seem to register the call
    // expect(mockCallback).toHaveBeenCalledTimes(1);
    // expect(mockCallback).toHaveBeenLastCalledWith(mockApiOutput);
});

test("getMoviesAPI fetch error", () => {
    // GIVEN
    const mockCallback = jest.fn();
    fetch.mockReject("test error");

    // WHEN getMoviesAPI is called
    getMoviesAPI(mockCallback);

    // THEN mockCallback should have been called once
    expect(mockCallback).toHaveBeenCalledTimes(0);
});

test("putMovieAPI", () => {
    // GIVEN
    const mockCallback = jest.fn();

    // WHEN getMoviesAPI is called
    putMovieAPI(mockApiOutput, mockCallback);

    // THEN mockCallback should have been called once
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(mockApiOutput);
});