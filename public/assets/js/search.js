document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    let games = [];

    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(data => {
            games = data;
        })
        .catch(error => console.error('Error loading games:', error));

    function updateGameVisibility() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const gameCards = document.querySelectorAll('.game-card');

        const activeTagsList = window.activeTags || [];

        gameCards.forEach(card => {
            const gameName = card.id;
            const matchesSearch = gameName.toLowerCase().includes(searchTerm);

            if (searchTerm === '' && activeTagsList.length === 0) {
                card.style.display = 'flex';
                return;
            }

            const game = games.find(g => g.name === gameName);

            let matchesTags = true;
            if (activeTagsList.length > 0) {
                matchesTags = game && game.tags &&
                    activeTagsList.some(tag => game.tags.includes(tag));
            }

            card.style.display = (matchesSearch && matchesTags) ? 'flex' : 'none';
        });
    }

    document.addEventListener('tagFilterChange', updateGameVisibility);

    searchInput.addEventListener('input', updateGameVisibility);
});