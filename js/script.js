"use strict"

const numberOfFjilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
const personalMovieDB = {
        count: numberOfFjilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };


for (let i = 0; i < 2; i++) {
    const a = prompt('Какой последний фильм вы смотрели?', ''),
          b = +prompt('На сколько оцените его?', '');
    
    if (!a || !b || b.length > 50) {
        console.log ('что-то пошло не так');
        i--;
    } else {
        personalMovieDB.movies[a] = b;
        console.log ('ok');
    }; 
}

console.log (personalMovieDB);

if (personalMovieDB.count < 10) {
    console.log ("Просмотрено довольно мало фильмов");
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log ("Вы классический зритель");
} else if (personalMovieDB.count >= 30) {
    console.log ("Батенька, да вы киноман!!");
} else {
    console.log ("Не, ну так не бывает");
};

