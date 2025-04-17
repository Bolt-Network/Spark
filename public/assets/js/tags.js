const tagsButton = document.getElementById("tagsbutton");
const tagsOpenImage = document.getElementById("tags-open-icon");
const tagsContainer = document.getElementById("tags-container");
const tagsSpace = document.getElementById("tags");
let tagsOpen = false;
let activeTags = [];

// Function to collect all unique tags from games
function collectAllTags(games) {
    const allTags = new Set();
    games.forEach(game => {
        if (game.tags) {
            game.tags.forEach(tag => allTags.add(tag));
        }
    });
    return Array.from(allTags).sort();
}

// Function to populate tags container
function populateTagsContainer(tags) {
    tagsSpace.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => {
            tagElement.classList.toggle('active');
            if (tagElement.classList.contains('active')) {
                activeTags.push(tag);
            } else {
                activeTags = activeTags.filter(t => t !== tag);
            }
            filterGamesByTags();
        });
        tagsSpace.appendChild(tagElement);
    });
}

// Function to filter games by selected tags
function filterGamesByTags() {
    const gameCards = document.querySelectorAll('.game-card');

    if (activeTags.length === 0) {
        // Show all games if no tags selected
        gameCards.forEach(card => {
            card.style.display = 'flex';
        });
        return;
    }

    // Get games data to check tags
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(games => {
            gameCards.forEach(card => {
                const gameName = card.id;
                const game = games.find(g => g.name === gameName);

                if (game && game.tags) {
                    // Check if game has any of the active tags
                    const hasMatchingTag = game.tags.some(tag => activeTags.includes(tag));
                    card.style.display = hasMatchingTag ? 'flex' : 'none';
                } else {
                    card.style.display = 'none';
                }
            });
        });
}

// Toggle tags container visibility
tagsButton.addEventListener("click", function () {
    if (tagsOpen) {
        tagsOpen = false;
        tagsButton.setAttribute("data-tooltip", "Show Tags");
        tagsOpenImage.style.rotate = "0deg";
        tagsContainer.style.height = "0";
    } else {
        tagsOpen = true;
        tagsButton.setAttribute("data-tooltip", "Hide Tags");
        tagsOpenImage.style.rotate = "180deg";
        tagsContainer.style.height = "100px"; // Changed to auto to accommodate all tags
    }
});

// Initialize tags when games are loaded
document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(games => {
            const allTags = collectAllTags(games);
            populateTagsContainer(allTags);
        })
        .catch(error => console.error('Error loading tags:', error));
});