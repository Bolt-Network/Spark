var gameframe = document.getElementById("gameframe");
var currentGameUrl = localStorage.getItem('url');
var homebutton = document.getElementById("go-home");
var fullscreenBtn = document.getElementById("fullscreen-btn");
var gameIcon = document.getElementById("game-icon");
var gameTitle = document.getElementById("game-title");
var unofficial = document.getElementById("unofficial");
var unofficialClose = document.getElementById("unofficial-close");

unofficial.style.display = "none";
if (localStorage.getItem('unofficial') == "true") {
  unofficial.style.display = "flex";
  unofficialClose.addEventListener("click", function () {
    unofficial.style.display = "none";

  });
}


gameframe.src = currentGameUrl;
gameframe.contentDocument.body.style.overflow = "hidden";
homebutton.addEventListener("click", function () {
  window.location.href = "/";
});

function loadRandomGames() {
  fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(games => {

      const filteredGames = games.filter(game => game.url !== currentGameUrl);

      const shuffledGames = filteredGames.sort(() => Math.random() - 0.5);

      const randomGames = shuffledGames.slice(0, Infinity);

      const moreGamesContainer = document.getElementById('more-games');
      const currentGame = games.find(game => game.url === currentGameUrl);
      if (currentGame) {
        gameIcon.src = currentGame.image;
        gameTitle.textContent = currentGame.name;
      }

      randomGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        const gameImage = document.createElement('img');
        gameImage.src = game.image;
        gameImage.alt = game.name;
        gameImage.className = 'game-image';

        const gameTitle = document.createElement('div');
        gameTitle.className = 'game-title';
        gameTitle.textContent = game.name;

        gameCard.addEventListener('click', () => {
          localStorage.setItem('url', game.url);
          window.location.href = "/game.html";
        });

        gameCard.appendChild(gameImage);
        gameCard.appendChild(gameTitle);

        moreGamesContainer.appendChild(gameCard);
      });
    })
    .catch(error => {
      console.error('Error loading games:', error);
    });
}

homebutton.addEventListener("click", function () {
  window.location.href = "/";
});

fullscreenBtn.addEventListener("click", function () {
  if (gameframe.requestFullscreen) {
    gameframe.requestFullscreen();
  } else if (gameframe.mozRequestFullScreen) {
    gameframe.mozRequestFullScreen();
  } else if (gameframe.webkitRequestFullscreen) {
    gameframe.webkitRequestFullscreen();
  } else if (gameframe.msRequestFullscreen) {
    gameframe.msRequestFullscreen();
  }
});

loadRandomGames();