"use strict"

const numberOfFjilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
const personalMovieDB = {
        count: numberOfFjilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };


const a = prompt('Какой последний фильм вы смотрели?', ''),
    b = +prompt('На сколько оцените его?', ''),
    c = prompt('Какой последний фильм вы смотрели?', ''),
    d = +prompt('На сколько оцените его?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log (personalMovieDB);