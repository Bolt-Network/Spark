const gameFrame = document.getElementById('gameframe');
const fullscreenButton = document.getElementById('fullscreen-button');
const unofficial = document.getElementById('unofficial');
const gameNameElement = document.getElementById('game-name-title');
const gameImage = document.getElementById('gamelogo');
var gameName = localStorage.getItem('name');

document.title = gameName + " - Play Games Online for Free on Spark";

document.addEventListener('DOMContentLoaded', function () {
  fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(games => {
      games.sort(() => Math.random() - 0.5);
      games.forEach(game => {
        var special = [];
        if (game.special) {
          special = game.special;
        }
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.id = game.name;
        gameCard.classList.add(game.size);

        const gameImage = document.createElement('img');
        gameImage.src = game.image;
        gameImage.alt = game.name;
        gameImage.className = 'game-image';

        const specialContainer = document.createElement('div');
        specialContainer.className = 'special-container';
        special.forEach(special => {
          const specialElement = document.createElement('div');
          if (special === 'hot') {
            const hotIcon = document.createElement('img');
            hotIcon.src = "/assets/imgs/svg/flame.svg";
            hotIcon.alt = "hot";
            hotIcon.className = 'hot-icon';
            specialElement.appendChild(hotIcon);
          }
          if (special === 'new') {
            const newIcon = document.createElement('img');
            newIcon.src = "/assets/imgs/svg/new.svg";
            newIcon.alt = "new";
            newIcon.className = 'new-icon';
            specialElement.appendChild(newIcon);
          }
          if (special === 'hr') {
            const newIcon = document.createElement('img');
            newIcon.src = "/assets/imgs/svg/hr.svg";
            newIcon.alt = "hr";
            newIcon.className = 'hr-icon';
            specialElement.appendChild(newIcon);
          }

          specialElement.className = 'special';
          specialElement.id = special;
          specialContainer.appendChild(specialElement);
        });

        const titleContainer = document.createElement('div');
        titleContainer.className = 'title-container';

        const gameTitle = document.createElement('div');
        gameTitle.className = 'game-title';
        gameTitle.textContent = game.name;

        gameCard.appendChild(specialContainer);
        titleContainer.appendChild(gameTitle);
        gameCard.appendChild(gameImage);
        gameCard.appendChild(titleContainer);

        gameCard.addEventListener('click', () => {
          localStorage.setItem('name', game.name);
          localStorage.setItem('image', game.image);
          localStorage.setItem('url', game.url);
          if (game.unofficial) {
            localStorage.setItem('unofficial', true);
          }
          else {
            localStorage.removeItem('unofficial');
          }
          window.location.href = "/game.html";
        });

        const gamesContainer = document.getElementById('more-games');
        gamesContainer.appendChild(gameCard);
      })
    });
});

if (localStorage.getItem('unofficial')) {
  unofficial.style.display = 'block';
  document.getElementById('unofficial-close').addEventListener('click', () => {
    localStorage.removeItem('unofficial');
    unofficial.style.display = 'none';
  });
  localStorage.removeItem('unofficial');
}
else {
  unofficial.style.display = 'none';
}

gameFrame.src = localStorage.getItem('url');


fullscreenButton.addEventListener('click', () => {
  if (gameFrame.requestFullscreen) {
    gameFrame.requestFullscreen();
  } else if (gameFrame.mozRequestFullScreen) { // Firefox
    gameFrame.mozRequestFullScreen();
  } else if (gameFrame.webkitRequestFullscreen) { // Chrome, Safari and Opera
    gameFrame.webkitRequestFullscreen();
  } else if (gameFrame.msRequestFullscreen) { // IE/Edge
    gameFrame.msRequestFullscreen();
  }
});

gameImage.src = localStorage.getItem('image');
gameNameElement.textContent = localStorage.getItem('name');