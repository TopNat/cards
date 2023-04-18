window.application = {
    blocks: {
    },
    screens: { 
    },
    renderScreen: function(screenName) {
        
        const app = document.querySelector('.app');
        app.textContent = '';
        
        if (this.screens[screenName]) {
            this.screens[screenName](app);
        }             
    },
    renderBlock: function(blockName, container) {

        this.blocks[blockName](container);  
    }    
}

function renderStartButton(container) {

    const button = document.createElement('button');
    button.textContent = 'Старт';
    button.classList.add('select-level__start');
    
    button.addEventListener('click', (event) => {
        console.log('game');
        window.application.renderScreen('game');
    });    
    container.appendChild(button);
}

window.application.blocks['start-button'] = renderStartButton; 

function renderLevel (container) {

    for (let i = 0; i < 3; i++) {
        let labelLevel = document.createElement('label');
        labelLevel.classList.add('select-level__level__item');  
        labelLevel.textContent = i+1;  
        container.appendChild(labelLevel); 
            let levelRadio = document.createElement('input');
            levelRadio.classList.add('select-level__radio');  
            levelRadio.type = 'radio';  
            levelRadio.style = 'display: none';  
            levelRadio.value = i+1;  
            levelRadio.name = 'level';  
            labelLevel.appendChild(levelRadio);         
    }

    container.addEventListener('change', (event) => {
        console.log(event.target.value);
        localStorage.setItem('level', event.target.value);        
    });    
}

window.application.blocks['level-radio'] = renderLevel; 

function rendetSelectLevelScreen(container) {

    const div = document.createElement('div');
    div.classList.add('select-level');    
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
        
    });    
    container.appendChild(button);
}

window.application.blocks['start-over'] = renderStartOverButton; 

function rendetGameScreen(container) {

    container.style = 'justify-content: top';

    const div = document.createElement('div');
    div.classList.add('game');    
    container.appendChild(div);  

    const divHeader = document.createElement('div');
    divHeader.classList.add('game__header');    
    div.appendChild(divHeader);  

    const divTimer = document.createElement('div');
    divTimer.classList.add('game__timer');   
    divTimer.textContent = '00.00'; 
    divHeader.appendChild(divTimer); 

    window.application.renderBlock('start-over', divHeader);

    const divCards = document.createElement('div');
    divCards.classList.add('game__cards');    
    div.appendChild(divCards); 

    for (let i = 0; i < 18; i++) {        
            const divCard = document.createElement('div');
            divCard.classList.add('game__card');   
            divCards.appendChild(divCard); 

            const img = document.createElement('img');
            img.src = 'img/card_back.jpg';  
            divCard.appendChild(img);   
    }

}
window.application.screens['game'] = rendetGameScreen; 
