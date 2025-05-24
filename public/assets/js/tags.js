const tagsButton = document.getElementById("tagsbutton");
const tagsOpenImage = document.getElementById("tags-open-icon");
const tagsContainer = document.getElementById("tags-container");
const tagsSpace = document.getElementById("tags");
let tagsOpen = false;

window.activeTags = [];

tagsContainer.style.pointerEvents = "none";
function collectAllTags(games) {
    const allTags = new Set();
    games.forEach(game => {
        if (game.tags) {
            game.tags.forEach(tag => allTags.add(tag));
        }
    });
    return Array.from(allTags).sort();
}


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


            document.dispatchEvent(new CustomEvent('tagFilterChange'));
        });
        tagsSpace.appendChild(tagElement);
    });
}

tagsButton.addEventListener("click", function () {
    if (tagsOpen) {
        tagsOpen = false;
        tagsButton.setAttribute("data-tooltip", "Show Tags");
        tagsOpenImage.style.rotate = "0deg";
        tagsContainer.style.opacity = "0";
        tagsContainer.style.transform = "translateY(-20px)";
        tagsContainer.style.pointerEvents = "none";
    } else {
        tagsOpen = true;
        tagsButton.setAttribute("data-tooltip", "Hide Tags");
        tagsOpenImage.style.rotate = "180deg";
        tagsContainer.style.opacity = "1";
        tagsContainer.style.transform = "translateY(0px)";
        tagsContainer.style.pointerEvents = "auto";
    }
});


document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(games => {
            const allTags = collectAllTags(games);
            populateTagsContainer(allTags);
        })
        .catch(error => console.error('Error loading tags:', error));
});
