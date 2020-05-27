"use strict"

let numberOfFjilms;

function start() {
    numberOfFjilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (numberOfFjilms == '' || numberOfFjilms == null || isNaN(numberOfFjilms)) {
        numberOfFjilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
}

start();


const personalMovieDB = {
        count: numberOfFjilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };


function rememberMyFilms() {

    for (let i = 0; i < 2; i++) {
        const a = prompt('Какой последний фильм вы смотрели?', ''),
              b = +prompt('На сколько оцените его?', '');
        
        if (a != null && b != null && a != '' && b != '' && a.length < 50) {
            personalMovieDB.movies[a] = b;
            console.log ('ok');
        } else {
            console.log ('что-то пошло не так');
            i--;
        }; 
    }
}

rememberMyFilms();


function detectPersonalLevel() {
    if (personalMovieDB.count < 10) {
        console.log ("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
        console.log ("Вы классический зритель");
    } else if (personalMovieDB.count >= 30) {
        console.log ("Батенька, да вы киноман!!");
    } else {
        console.log ("Не, ну так не бывает");
    };
}

detectPersonalLevel();


function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}

showMyDB(personalMovieDB.privat);


function writeYourGenres() {

    for (let i = 1; i <= 3; i++) {
        const favoriteGenre = prompt(`Ваш любимый жанр под номером ${i}?`);

        personalMovieDB.genres[i - 1] = favoriteGenre;
    }
    
}

writeYourGenres();

console.log (personalMovieDB);