//import { slice } from 'prelude-ls';
import '../style/style.css';

const DIFFICULTY = [6, 12, 18];
const CARDDISPLAYTIME = 2000;
const CARDSLIST = [
    'ace_hearts',
    'ace_spades',
    'ace_clubs',
    'ace_diamonds',
    'jack_hearts',
    'jack_spades',
    'jack_clubs',
    'jack_diamonds',
    'king_hearts',
    'king_spades',
    'king_clubs',
    'king_diamonds',
    'queen_hearts',
    'queen_spades',
    'queen_clubs',
    'queen_diamonds',
    '6_hearts',
    '6_spades',
    '6_clubs',
    '6_diamonds',
    '7_hearts',
    '7_spades',
    '7_clubs',
    '7_diamonds',
    '8_hearts',
    '8_spades',
    '8_clubs',
    '8_diamonds',
    '9_hearts',
    '9_spades',
    '9_clubs',
    '9_diamonds',
    '10_hearts',
    '10_spades',
    '10_clubs',
    '10_diamonds',
];

window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName) {
        const app = document.querySelector('.app');
        app.textContent = '';
        if (this.screens[screenName]) {
            this.screens[screenName](app);
        }
    },
    renderBlock: function (blockName, container) {
        this.blocks[blockName](container);
    },
};
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    let secs = 0;
    let clock = document.querySelector('.game__timer');
    window.application.timer = setInterval(function () {
        secs++;
        let min = Math.floor(secs / 60);
        let sec = secs - min * 60;
        if (sec < 10) sec = '0' + sec;
        if (min < 10) min = '0' + min;
        clock.textContent = min + '.' + sec;
        if (min === 59 && sec === 59) clearInterval(window.application.timer);
    }, 1000);
}

function renderStartButton(container) {
    const button = document.createElement('button');
    button.textContent = 'Старт';
    button.classList.add('select-level__start');

    container.addEventListener('submit', (event) => {
        event.preventDefault();
        const levels = container.querySelectorAll('.select-level__radio');
        levels.forEach((element) => {
            if (element.checked) window.application.difficulty = element.value;
        });

        window.application.renderScreen('game');
    });
    container.appendChild(button);
}

window.application.blocks['start-button'] = renderStartButton;

function renderLevel(container) {
    for (let i = 0; i < 3; i++) {
        let labelLevel = document.createElement('label');
        labelLevel.classList.add('select-level__level__item');
        labelLevel.textContent = i + 1;
        labelLevel.for = 'level' + i;
        if (i === 0) {
            labelLevel.classList.add('select-level__level__item_select');
        }
        container.appendChild(labelLevel);
        let levelRadio = document.createElement('input');
        levelRadio.classList.add('select-level__radio');
        levelRadio.id = 'level' + i;
        levelRadio.type = 'radio';
        levelRadio.style = 'display: none';
        levelRadio.value = i + 1;
        levelRadio.name = 'level';
        if (i === 0) levelRadio.checked = true;
        labelLevel.appendChild(levelRadio);
    }

    container.addEventListener('change', (event) => {
        const radios = container.querySelectorAll('.select-level__level__item');
        radios.forEach((element) => {
            element.classList.remove('select-level__level__item_select');
        });
        event.target.parentElement.classList.add(
            'select-level__level__item_select'
        );
    });
}

window.application.blocks['level-radio'] = renderLevel;

function rendetSelectLevelScreen(container) {
    const div = document.createElement('form');
    div.classList.add('select-level');
    div.action = '#';
    container.appendChild(div);

    const title = document.createElement('div');
    title.classList.add('select-level__title');
    title.textContent = 'Выбери сложность';
    div.appendChild(title);

    const divLevel = document.createElement('div');
    divLevel.classList.add('select-level__level');
    div.appendChild(divLevel);

    window.application.renderBlock('level-radio', divLevel);
    window.application.renderBlock('start-button', div);
}
window.application.screens['level-select'] = rendetSelectLevelScreen;

function renderStartOverButton(container) {
    const button = document.createElement('button');
    button.textContent = 'Начать заново';
    button.classList.add('game__start-over');

    button.addEventListener('click', (event) => {
        console.log('start over');
        console.log(event);
        const app = document.querySelector('.app');
        app.style = '';
        window.application.renderScreen('level-select');
    });
    container.appendChild(button);
}

window.application.blocks['start-over'] = renderStartOverButton;

function renderHeaderGame(container) {
    const divHeader = document.createElement('div');
    divHeader.classList.add('game__header');
    container.appendChild(divHeader);

    const divTimer = document.createElement('div');
    divTimer.classList.add('game__timer_general');
    divHeader.appendChild(divTimer);

    const divTimerMS = document.createElement('div');
    divTimerMS.classList.add('game__timerMS');
    divTimer.appendChild(divTimerMS);

    const divTimerMin = document.createElement('div');
    divTimerMin.classList.add('game__min');
    divTimerMin.textContent = 'min';
    divTimerMS.appendChild(divTimerMin);

    const divTimerSek = document.createElement('div');
    divTimerSek.classList.add('game__sek');
    divTimerSek.textContent = 'sek';
    divTimerMS.appendChild(divTimerSek);

    const divTimerTime = document.createElement('div');
    divTimerTime.classList.add('game__timer');
    divTimerTime.textContent = '00.00';
    divTimer.appendChild(divTimerTime);

    window.application.renderBlock('start-over', divHeader);
}
window.application.blocks['header-game'] = renderHeaderGame;

function clearStep() {
    window.application.step1 = '';
    window.application.step2 = '';
}

function gameResult() {
    clearInterval(window.application.timer);
    if (window.application.step1 && window.application.step2) {
        if (window.application.step1 === window.application.step2) {
            alert('Вы выиграли!');
            clearStep();
        } else {
            alert('Вы проиграли!');
            clearStep();
        }
    }
}

function getArrayCards() {
    const countCards = DIFFICULTY[window.application.difficulty - 1];
    shuffle(CARDSLIST);
    let cardsGame = CARDSLIST.slice(1, countCards / 2 + 1);
    cardsGame = [...cardsGame, ...cardsGame];
    shuffle(cardsGame);
    window.application.cardsGame = cardsGame;
}

function showCards(container) {
    const countCards = DIFFICULTY[window.application.difficulty - 1];

    for (let i = 0; i < countCards; i++) {
        const divCard = document.createElement('div');
        divCard.classList.add('game__card');
        container.appendChild(divCard);

        const img = document.createElement('img');
        img.classList.add('game__card-img');
        img.src = `img/cards/${window.application.cardsGame[i]}.jpg`;
        img.id = i;
        divCard.appendChild(img);
    }
}

function showCardBack() {
    const imgs = document.querySelectorAll('.game__card-img');
    imgs.forEach((img) => {
        img.src = 'img/card_back.jpg';
        img.addEventListener('click', (event) => {
            event.target.src = `img/cards/${
                window.application.cardsGame[event.target.id]
            }.jpg`;

            if (window.application.step1) {
                window.application.step2 =
                    window.application.cardsGame[event.target.id];
            } else {
                window.application.step1 =
                    window.application.cardsGame[event.target.id];
            }
            setTimeout(gameResult, 1000);
        });
    });
}

function rendetGameScreen(container) {
    container.style = 'justify-content: start';

    const div = document.createElement('div');
    div.classList.add('game');
    container.appendChild(div);

    window.application.renderBlock('header-game', div);

    const divCards = document.createElement('div');
    divCards.classList.add('game__cards');
    div.appendChild(divCards);

    getArrayCards();

    showCards(divCards);

    setTimeout(showCardBack, CARDDISPLAYTIME);

    startTimer();
}
window.application.screens['game'] = rendetGameScreen;

window.application.renderScreen('level-select');
