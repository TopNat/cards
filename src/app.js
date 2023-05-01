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
    //console.log(array);
    array.sort(() => Math.random() - 0.5);
    //console.log(array);
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

function rendetGameScreen(container) {
    container.style = 'justify-content: start';

    const div = document.createElement('div');
    div.classList.add('game');
    container.appendChild(div);

    window.application.renderBlock('header-game', div);

    const divCards = document.createElement('div');
    divCards.classList.add('game__cards');
    div.appendChild(divCards);

    const countCards = DIFFICULTY[window.application.difficulty - 1];
    shuffle(CARDSLIST);
    //console.log(CARDSLIST);

    for (let i = 0; i < countCards; i++) {
        const divCard = document.createElement('div');
        divCard.classList.add('game__card');
        divCards.appendChild(divCard);

        const img = document.createElement('img');
        img.classList.add('game__card-img');
        img.src = 'img/card_back.jpg';
        img.id = i;
        //img.src = `img/cards/${CARDSLIST[i]}.jpg`;

        divCard.appendChild(img);

        img.addEventListener('click', (event) => {
            console.log(event.target.id);
            event.target.src = `img/cards/${CARDSLIST[event.target.id]}.jpg`;
        });
    }
}
window.application.screens['game'] = rendetGameScreen;
