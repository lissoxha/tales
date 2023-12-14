const imageBasePath = 'imagesgame/';
const imageNames = [
  'морковка.png', 'рыба.png', 'цветы.png',
  'арбуз.png', 'шляпа.png', 'яблоко.png',
  'кекс.png', 'яблоко.png', 'морковка.png',
  'шляпа.png', 'кекс.png', 'рыба.png',
  'рыба.png', 'морковка.png', 'цветы.png',
  'арбуз.png'
];

const images = imageNames.map(name => imageBasePath + name);

let timer = 20;
let timerInterval;
let clickedImages = 0;
let imageSpeedMultiplier = 1;

let gameStartTime;

function startGame() {
  const playerNameInput = document.getElementById('player-name');
  const playerName = playerNameInput.value.trim();

  if (playerName === '') {
    alert('Пожалуйста, введите ваше имя.');
    return;
  }
      // Сохранение имени игрока в localStorage
      localStorage.setItem('playerName', playerName);

      gameStartTime = new Date();

  const hideElement = (elementId) => document.getElementById(elementId).style.display = 'none';
  const showElement = (elementId) => document.getElementById(elementId).style.display = 'block';

  hideElement('name-screen');
  showElement('menu-screen');
  hideElement('timer');
  hideElement('rules-image');
  showElement('rabbit');
  hideElement('time');
}


function startLevel(level) {
  hideElement('menu-screen'); showElement('rules-image');
  showElement('rabbit'); showElement('level'); showElement('time');
 if (level==3) {
  timer = 5;
 } else if (level === 2) {
    timer = 10;
  } else {
    timer = 15; }
    
  setTimeout(() => {
    hideElement('rules-image'); showElement('timer');
    showElement('game-container'); showElement('result');
    createImages(); updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    setInterval(swapRandomImages, 450);
  }, 6000);
}

//все картинки уровней
function createImages(imageCount = 16, imageArray = images) {
  const gameContainer = document.getElementById('game-container');
  gameContainer.innerHTML = ''; 

  let leftPosition = 0;
  let topPosition = 0;

  imageArray.slice(0, imageCount).forEach((image, index) => {
    const element = document.createElement('div');
    element.className = 'shape';
    element.style.top = `${topPosition}px`;
    element.style.left = `${leftPosition}px`;

    const imgElement = document.createElement('img');
    imgElement.src = image;
    element.appendChild(imgElement);

    imgElement.addEventListener('click', () => onImageClick(index));
    gameContainer.appendChild(element);

    leftPosition += 25 + 70;
    if ((index + 1) % 4 === 0) {
      leftPosition = 0;
      topPosition += 25 + 70;
    }
  });

  const imagesElements = Array.from(gameContainer.getElementsByClassName('shape'));
  imagesElements.forEach(image => {
    const currentTop = parseInt(image.style.top);
    const currentLeft = parseInt(image.style.left);
    ensureWithinBounds(image);
  });
}

//перестановка картинок
  function swapRandomImages() {

    const gameContainer = document.getElementById('game-container');
    const imagesElements = Array.from(gameContainer.getElementsByClassName('shape'));

    const randomIndex1 = Math.floor(Math.random() * imagesElements.length);
    let randomIndex2 = Math.floor(Math.random() * imagesElements.length);

    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * imagesElements.length);
    }
    const image1 = imagesElements[randomIndex1];
    const image2 = imagesElements[randomIndex2];

    const tempTop = image1.style.top;
    const tempLeft = image1.style.left;

    image1.style.top = image2.style.top;
    image1.style.left = image2.style.left;

    image2.style.top = tempTop;
    image2.style.left = tempLeft;

    ensureWithinBounds(image1);
    ensureWithinBounds(image2);
  }
 let currentLevel = 1;
 let level1Time = 0;
 let level2Time = 0;
 let playerName;

 function hideElement(elementId) {
  document.getElementById(elementId).style.display = 'none';
}

function showElement(elementId) {
  document.getElementById(elementId).style.display = 'block';
}

//новый уровень
function startNextLevel() {
currentLevel=2;
timer = 10;
updateTimer();
document.getElementById('level').textContent = `Level: ${currentLevel}`;
clickedImage=0;
clearInterval(timerInterval);
timerInterval = setInterval(updateTimer, 450);

const gameContainer = document.getElementById('game-container');
if (currentLevel === 2) {
  gameContainer.style.width = '550px';
  gameContainer.style.height = '500px';

  const newImages = [
    'мишка.png', 'куст.png', 'куст.png',
    'заяц.png', 'куст.png', 'куст.png',
    'куст.png', 'лиса.png', 'куст.png',
    'куст.png', 'куст.png', 'мишка.png',
    'куст.png', 'куст.png', 'лиса.png',
    'куст.png', 'волк.png', 'куст.png',
    'волк.png', 'волк.png', 'куст.png',
    'куст.png', 'куст.png', 'куст.png',
    'куст.png'
  ];
  const imag = newImages.map(name => `imagesgame/${name}`);
  createImag(25, imag); 
  
} else {
  //для 1 уровня
  gameContainer.style.width = '400px';
  gameContainer.style.height = '400px';
  createImages(16, images);
}
setInterval(swapRandomImages, 450);
}

//динамическое создание элементов
function createImag(imageCount, imag) {
const gameContainer = document.getElementById('game-container');
gameContainer.innerHTML = ''; 

let leftPosition = 0;
let topPosition = 0;

imag.slice(0, imageCount).forEach((image, index) => {
  const element = document.createElement('div');
  element.className = 'shape';
  element.style.top = `${topPosition}px`;
  element.style.left = `${leftPosition}px`;

  const imgElement = document.createElement('img');
  imgElement.src = image;
  element.appendChild(imgElement);

  imgElement.addEventListener('click', () => onImageClick(index));
  gameContainer.appendChild(element);

  leftPosition += 25 + 70;
  if ((index + 1) % 5 === 0) { 
    leftPosition = 0;
    topPosition += 25 + 70;
  }
});
}

// счетчики
let clickedCarrotCount = 0; 
let clickedRabbitCount = 0; 

function onImageClick(index) {
  const clickedImage = imageNames[index];
  clickedImages++;

  if (currentLevel === 1) {
    level1Time = 20 - timer; // Подсчитываем время на первом уровне
  } else if (currentLevel === 2) {
    level2Time = 15 - timer; // Подсчитываем время на втором уровне
  }
   if (currentLevel === 2) {
    showCardImage1();  
  }
  if (clickedImage === 'морковка.png') {
    clickedCarrotCount++;
    if (clickedCarrotCount === 3) {

      showCardImage();
      setTimeout(() => {
        hideCardImage();
        startNextLevel();
      }, 7000);
    }
  }
}

function showCardImage1() {
  const cardImageElement1 = document.createElement('img');
  cardImageElement1.src = 'imagesgame/карточка1.png';
  cardImageElement1.id = 'cardImage1';
  cardImageElement1.classList.add('custom-image-style');
  document.body.appendChild(cardImageElement1);
  endGame('');
}

function showCardImage() {
const cardImageElement = document.createElement('img');
cardImageElement.src = 'imagesgame/уровень.png';  
cardImageElement.id = 'cardImage';
cardImageElement.classList.add('custom-image-style'); 
document.body.appendChild(cardImageElement);
}

function hideCardImage() {//карточка.png
const cardImageElement = document.getElementById('cardImage');
if (cardImageElement) {
  cardImageElement.parentNode.removeChild(cardImageElement);
}
}

function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `${timer}`;

  if (timer === 0) {
    if (currentLevel === 2) {
      hideAllElements()
      currentLevel = 1; // сброс уровня при проигрыше
    } else {
      hideAllElements()
    }
  }
  timer--;
}

  function ensureWithinBounds(image) {
    const gameContainer = document.getElementById('game-container');
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const imageWidth = image.clientWidth;
    const imageHeight = image.clientHeight;

    image.style.top = Math.min(parseInt(image.style.top), containerHeight - imageHeight) + 'px';
    image.style.left = Math.min(parseInt(image.style.left), containerWidth - imageWidth) + 'px';
  } 
  let gameTimerInterval;
  let gameTimerSeconds = 20; 

//финальный уровень перед finish game
  function endGame(message) {
    clearInterval(gameTimerInterval);
    const resultElement = document.getElementById('result');
    const resultMessageElement = document.getElementById('result-message');
    const resultImageElement = document.getElementById('result-image');

    resultMessageElement.textContent = message;
    resultElement.style.display = 'none';
    resultImageElement.style.display = 'none';
    
    resetGame();
  }

  function resetGame() {
    document.body.innerHTML = '';

    const level3Image = document.createElement('img');
    level3Image.src = 'imagesgame/уровень3.png';
    level3Image.classList.add('custom-image-style');

    const additionalImage = document.createElement('img');
    additionalImage.src = 'imagesgame/ур3.png';
    additionalImage.classList.add('level3');

    const timeImage = document.createElement('img');
    timeImage.src = 'imagesgame/time.png';
    timeImage.classList.add('time3');

    document.body.appendChild(level3Image);
    document.body.appendChild(additionalImage);
    document.body.appendChild(timeImage);

    setTimeout(function () {
        level3Image.style.display = 'none';

        const gameTimerElement = document.createElement('div');
        gameTimerElement.id = 'game-timer';
        gameTimerElement.textContent = `${gameTimerSeconds}`;
        document.body.appendChild(gameTimerElement);

        gameTimerInterval = setInterval(function () {
            gameTimerSeconds--;
            gameTimerElement.textContent = `${gameTimerSeconds}`;

            if (gameTimerSeconds === 1) {
                hideAllImages();
            }
            if (gameTimerSeconds <= 0) {
                clearInterval(gameTimerInterval);
                endGame("Время вышло!");
            }
        }, 1000);
    }, 7000);

    const boxElement = document.createElement('img');
    boxElement.src = 'imagesgame/ящик.png';
    boxElement.alt = 'Ящик';
    boxElement.style.position = 'absolute';
    boxElement.style.left = '70%';
    boxElement.style.top = '70%';
    boxElement.style.zIndex = '1';
    document.body.appendChild(boxElement);
  
    const imageSources = [
      'imagesgame/гриб.png', 'imagesgame/морковь.png',   'imagesgame/огурец.png',   'imagesgame/капуста.png',   'imagesgame/помидор.png',  'imagesgame/капуста1.png', 'imagesgame/помидор.png',
      'imagesgame/огурец.png',  'imagesgame/лисички.png', 'imagesgame/капуста1.png',  'imagesgame/морковь.png','imagesgame/капуста.png'
  ];

    let x = 10;
    let y = 10;
    const margin = 10;
    const imagesPerRow = 4;
  
    for (let i = 0; i < imageSources.length; i++) {
      const imageElement = document.createElement('img');
      imageElement.src = imageSources[i];
      imageElement.alt = `Изображение ${i + 1}`;
      imageElement.style.position = 'absolute';
      imageElement.style.left = `${x}px`;
      imageElement.style.top = `${y}px`;
  
      // Делаем изображение перемещаемым
      imageElement.addEventListener('mousedown', startDragging);
      document.addEventListener('mouseup', stopDragging);
      document.addEventListener('mousemove', drag);
  
      document.body.appendChild(imageElement);
  
      x += imageElement.width + margin;
      if ((i + 1) % imagesPerRow === 0) {
        x = 10;
        y += imageElement.height + margin;
      }
    }
  }

function hideAllImages() {
  const playerName = localStorage.getItem('playerName');
  const gameTime = localStorage.getItem('gameTime');
  hideElement('game-timer');
  clearInterval(timerInterval);
  const images = document.querySelectorAll('img');
  images.forEach(image => {
    image.style.display = 'none';
  });

  const endTime = new Date();
  const timeDifference = (endTime - gameStartTime) / 1000;

  //  результаты всех игроков из localStorage
  let playerResults = JSON.parse(localStorage.getItem('playerResults')) || [];
  //  текущий результат
  playerResults.push({ playerName, gameTime: timeDifference });
  playerResults.sort((a, b) => a.gameTime - b.gameTime);


  playerResults = playerResults.slice(0, 3);
  localStorage.setItem('playerResults', JSON.stringify(playerResults));

  //рейтинг
  const ratingMessage = document.createElement('div');
  ratingMessage.id = 'ratingMessage';
  ratingMessage.innerHTML = '<h3>Рейтинг игроков:</h3>';

  playerResults.forEach((result, index) => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `${index + 1}. ${result.playerName}: ${result.gameTime} сек.`;
    ratingMessage.appendChild(paragraph);
  });

  const endingMessage = document.createElement('div');
  endingMessage.id = 'endingMessage';
  endingMessage.textContent = `${playerName}, игра окончена! Хотите поиграть еще раз?`;

  // обновление страницы
  const restartButton = document.createElement('button');
  restartButton.id = 'restartButton';
  restartButton.textContent = 'Играть';
  restartButton.addEventListener('click', function () {
    location.reload();
  });

  // рейтинг
  document.body.appendChild(ratingMessage);
  document.body.appendChild(endingMessage);
  document.body.appendChild(restartButton);
}

let isDragging = false;
let draggedElement = null;
let offset = { x: 0, y: 0 };

function startDragging(e) {
    isDragging = true;
    draggedElement = e.target;
    offset = {
        x: e.clientX - draggedElement.getBoundingClientRect().left,
        y: e.clientY - draggedElement.getBoundingClientRect().top
    };
}

function stopDragging() {
    isDragging = false;
}

function drag(e) {
  if (!isDragging) return;

  draggedElement.style.left = `${e.clientX - offset.x}px`;
  draggedElement.style.top = `${e.clientY - offset.y}px`;

  // координаты и размеры ящика
  const boxRect = document.querySelector('img[src*="ящик.png"]').getBoundingClientRect();
  const images = document.querySelectorAll('img');
  let allImagesTouchingBox = true;

  images.forEach(image => {
      // ящик вне проверки
      if (image.src.includes('ящик.png')) return;

      const imageRect = image.getBoundingClientRect();

      // касается ли текущая картинка ящика
      const touchingBox =
          imageRect.left < boxRect.right &&
          imageRect.right > boxRect.left &&
          imageRect.top < boxRect.bottom &&
          imageRect.bottom > boxRect.top;

      if (!touchingBox) {
          allImagesTouchingBox = false;
          return; //если хотя бы одна картинка не касается ящика
      }
  });
  if (allImagesTouchingBox) {
      hideAllImages();
  }
}

const finishGameButton = document.createElement('button');
finishGameButton.id = 'finish-game-button';
finishGameButton.textContent = 'стоп';
finishGameButton.addEventListener('click', hideAllElements);
document.body.appendChild(finishGameButton);

reloadButton.addEventListener('click', function () {
  location.reload();
});

document.body.appendChild(reloadButton);

function hideAllElements() {
  location.reload();
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    element.style.display = 'none';
  });
}


//выполнила Матюшкина Елизавета 