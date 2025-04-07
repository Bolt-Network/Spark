document.addEventListener('DOMContentLoaded', function () {
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(games => {
            games.sort((a, b) => a.name.localeCompare(b.name));
            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.id = game.name;
                gameCard.classList.add(game.size);

                const gameImage = document.createElement('img');
                gameImage.src = game.image;
                gameImage.alt = game.name;
                gameImage.className = 'game-image';

                const titleContainer = document.createElement('div');
                titleContainer.className = 'title-container';

                const gameTitle = document.createElement('div');
                gameTitle.className = 'game-title';
                gameTitle.textContent = game.name;

                titleContainer.appendChild(gameTitle);
                gameCard.appendChild(gameImage);
                gameCard.appendChild(titleContainer);

                gameCard.addEventListener('click', () => {
                    localStorage.setItem('url', game.url);
                    window.location.href = "/game.html";
                });

                const gamesContainer = document.getElementById('games');
                gamesContainer.appendChild(gameCard);
            })
        });
});