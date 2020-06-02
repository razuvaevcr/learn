"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };


    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkBox = addForm.querySelector('[type="checkbox"]');


    addForm.addEventListener('submit', (event) => { // обработчик события отправки формы
        event.preventDefault();

        let newFilm = addInput.value;
        const favorit = checkBox.checked;

        if(newFilm) {

            if (newFilm.length > 21){
                newFilm = `${newFilm.substring(0, 22)}...`; //обрезаем название до 21-го символа
            }

            if (favorit) {
                console.log('Добавляем любимый фильм')
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovielist(movieDB.movies, movieList);
        };

        event.target.reset(); // очищает форму (цель события)

    });


    const deleteAdv = (arr) => { //функция удаления рекламы
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = "драма";

        poster.style.background = "url('/img/bg.jpg')";
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovielist(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovielist(movieDB.movies, movieList);
            });
        });
    };


    deleteAdv(adv);
    makeChanges();
    
    createMovielist(movieDB.movies, movieList);

});