const tagsButton = document.getElementById("tagsbutton");
const tagsOpenImage = document.getElementById("tags-open-icon");
const tagsContainer = document.getElementById("tags-container");
const tagsSpace = document.getElementById("tags");
let tagsOpen = false;
// Make activeTags global so search.js can access it
window.activeTags = [];

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
                window.activeTags.push(tag);
            } else {
                window.activeTags = window.activeTags.filter(t => t !== tag);
            }

            // Dispatch event after updating the tags
            document.dispatchEvent(new CustomEvent('tagFilterChange'));
        });
        tagsSpace.appendChild(tagElement);
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
        tagsContainer.style.height = "70px"; // Changed to auto to accommodate all tags
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
