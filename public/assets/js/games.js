document.addEventListener('DOMContentLoaded', () => {
    let allGames = [];
    let selectedTags = new Set();

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterGames);

    function setupTagFilters() {
        const uniqueTags = new Set();

        allGames.forEach(game => {
            if (game.tags) {
                game.tags.forEach(tag => uniqueTags.add(tag));
            }
        });

        const tagContainer = document.createElement('div');
        tagContainer.id = 'tag-filters';
        tagContainer.className = 'tag-filters';

        const tagHeading = document.createElement('h3');
        tagHeading.textContent = 'Filter by Tags:';
        tagContainer.appendChild(tagHeading);

        uniqueTags.forEach(tag => {
            const tagButton = document.createElement('button');
            tagButton.className = 'tag-button';
            tagButton.textContent = tag;
            tagButton.dataset.tag = tag;

            tagButton.addEventListener('click', () => {
                tagButton.classList.toggle('active');

                if (selectedTags.has(tag)) {
                    selectedTags.delete(tag);
                } else {
                    selectedTags.add(tag);
                }

                filterGames();
            });

            tagContainer.appendChild(tagButton);
        });

        const clearButton = document.createElement('button');
        clearButton.id = 'clear-filters';
        clearButton.textContent = 'Clear Filters';
        clearButton.addEventListener('click', () => {
            selectedTags.clear();
            document.querySelectorAll('.tag-button').forEach(btn => {
                btn.classList.remove('active');
            });
            filterGames();
        });

        tagContainer.appendChild(clearButton);

        const searchContainer = document.getElementById('search-container');
        searchContainer.after(tagContainer);
    }

    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const gamesContainer = document.getElementById('games');

        gamesContainer.innerHTML = '';

        const filteredGames = allGames.filter(game => {
            const matchesSearch = game.name.toLowerCase().includes(searchTerm) ||
                (game.tags && game.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

            if (selectedTags.size === 0) {
                return matchesSearch;
            }

            const hasTags = game.tags && game.tags.some(tag => selectedTags.has(tag));

            return matchesSearch && hasTags;
        });

        if (filteredGames.length === 0) {
            const noResults = document.createElement('div');
            noResults.id = 'no-results';
            noResults.textContent = 'No games found. Try adjusting your filters.';
            gamesContainer.appendChild(noResults);
            return;
        }

        displayGames(filteredGames);
    }

    function displayGames(games) {
        const gamesContainer = document.getElementById('games');

        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';

            if (game.size) {
                gameCard.classList.add(`size-${game.size}`);
            } else {
                gameCard.classList.add('size-m');
            }

            if (game.tags) {
                for (const tag of game.tags) {
                    gameCard.classList.add(`tag-${tag}`);
                }
            }

            if (game.special) {
                for (const s of game.special) {
                    gameCard.classList.add(`special-${s}`);
                }
            }

            const gameImage = document.createElement('img');
            gameImage.src = game.image;
            gameImage.alt = game.name;
            gameImage.className = 'game-image';

            const gameTitle = document.createElement('h3');
            gameTitle.className = 'game-title';
            gameTitle.textContent = game.name;

            gameCard.addEventListener('click', () => {
                localStorage.setItem('url', game.url);
                window.location.href = "/game.html";
            });

            gameCard.appendChild(gameImage);
            gameCard.appendChild(gameTitle);

            gamesContainer.appendChild(gameCard);
        });
    }

    fetch('/assets/json/games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(games => {
            allGames = games.sort((a, b) => a.name.localeCompare(b.name));

            if (!document.getElementById('games')) {
                console.error('Games container not found in the DOM');
                return;
            }

            setupTagFilters();
            displayGames(allGames);
        })
        .catch(error => {
            console.error('Error fetching games:', error);
        });
});