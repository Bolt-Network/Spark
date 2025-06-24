const allGamesButton = document.getElementById('all-games');

fetch('/assets/json/topgames.json')
    .then(response => response.json())
    .then(games => {
        const topGamesGrid = document.getElementById('top-games-grid');

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.style.backgroundImage = `url(${game.image})`;

            const gameLink = document.createElement('a');
            gameLink.href = `/play/${game.name}`;
            gameLink.className = 'game-link';

            const gameName = document.createElement('div');
            gameName.className = 'game-name';
            gameName.textContent = game.name;

            gameLink.appendChild(gameName);
            gameCard.appendChild(gameLink);
            topGamesGrid.appendChild(gameCard);
        });
    })
    .catch(error => {
        console.error('Error loading games:', error);
    });

fetch('/assets/json/hotgames.json')
    .then(response => response.json())
    .then(games => {
        const topGamesGrid = document.getElementById('hot-games-grid');

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.style.backgroundImage = `url(${game.image})`;

            const gameLink = document.createElement('a');
            gameLink.href = `/play/${game.name}`;
            gameLink.className = 'game-link';

            const gameName = document.createElement('div');
            gameName.className = 'game-name';
            gameName.textContent = game.name;

            gameLink.appendChild(gameName);
            gameCard.appendChild(gameLink);
            topGamesGrid.appendChild(gameCard);
        });
    })
    .catch(error => {
        console.error('Error loading games:', error);
    });

allGamesButton.addEventListener('click', () => {
    window.location.href = '/games';
});