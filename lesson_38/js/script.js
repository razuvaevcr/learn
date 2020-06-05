'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                };
            });

        }

    });

    hideTabContent();
    showTabContent();

    //Timer

    const deadline = '2020-6-5';

    function getTimeRemaning(endtime) { // вычисляет оставшееся время до конца акции
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        return { // возвращает обьект со всеми вычисленными переменными внутри
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    };

    function getZero(num) { // добавляем 0 перед числом
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    function setClock(selector, endtime) { // получает доступ к часам на сайте 
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); // вызвана для того, чтобы избежать интервал при первом ее срабатывании

        function updateClock() { // обновляет часы
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days); // вставляет подсчеты на страницу
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            };
        }

    };

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    function openModal() { // функция создана чтобы не повторять код
        modal.classList.add('show');
        modal.classList.remove('hide');

        document.body.style.overflow = 'hidden'; // обращается к заранее установленному стилю

        clearInterval(modalTimerId); // если юзер сам откроет modal, то он не откроется через таймаут
    };

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function closeModal() { // функция создана чтобы не повторять код
        modal.classList.add('hide');
        modal.classList.remove('show');

        document.body.style.overflow = ''; // обращается к заранее установленному стилю
    };

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => { // при нажатии вне modal закрывает modal
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => { // при нажатии esc закрывает modal
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    /* const modalTimerId = setTimeout(openModal, 5000); */ // открытие modal через время

    function showModalByScroll() { // сделана для назначения removeEventListener
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // если величина пролистанного и величина видимого >= величине страницы
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // удаляет обработчик сработавший один раз
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    // Use class for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() { //доп функция перевода цен в гривны
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render(); // сокрощенный вызов метода обьекта

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();
});