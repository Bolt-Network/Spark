document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    let games = []; // Store games data globally

    // Fetch games data once
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(data => {
            games = data;
        })
        .catch(error => console.error('Error loading games:', error));

    // Function to check if search and tag filters both match
    function updateGameVisibility() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const gameCards = document.querySelectorAll('.game-card');

        // Get active tags from the global variable in tags.js
        const activeTagsList = window.activeTags || [];

        gameCards.forEach(card => {
            const gameName = card.id;
            const matchesSearch = gameName.toLowerCase().includes(searchTerm);

            // If no search term and no tags, show all
            if (searchTerm === '' && activeTagsList.length === 0) {
                card.style.display = 'flex';
                return;
            }

            // Find the game data to check its tags
            const game = games.find(g => g.name === gameName);

            // Check if game has any of the active tags (if there are active tags)
            let matchesTags = true;
            if (activeTagsList.length > 0) {
                matchesTags = game && game.tags &&
                    activeTagsList.some(tag => game.tags.includes(tag));
            }

            // Show card only if it matches both search and tag filters
            card.style.display = (matchesSearch && matchesTags) ? 'flex' : 'none';
        });
    }

    // Listen for tag filter changes
    document.addEventListener('tagFilterChange', updateGameVisibility);

    // Handle search input
    searchInput.addEventListener('input', updateGameVisibility);
});
