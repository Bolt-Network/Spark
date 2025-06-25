const homeButton = document.getElementById('logo');

document.addEventListener('DOMContentLoaded', function () {
    fetch('/assets/json/games.json')
        .then(response => response.json())
        .then(games => {
            games.sort((a, b) => {
                if (a.important && !b.important) return -1;
                if (b.important && !a.important) return 1;
                return a.name.localeCompare(b.name);
            });
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
                gameImage.className = 'game-image';
                gameImage.alt = game.name;
                gameImage.loading = "lazy";
                gameImage.srcset = `
    ${game.image} 340w
`;
                gameImage.sizes = "(max-width: 100px) 100px, (max-width: 220px) 220px, 340px";
                gameImage.src = game.image;
                gameImage.onload = () => {
                    gameImage.classList.add('loaded');
                }

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
                    if (game.url.includes('play.geforcenow.com') || game.url.includes('https://play-cs.com')) {
                        window.open(game.url, '_blank');
                        return;
                    }
                    if (game.url.includes('https://') || game.url.includes('http://') || game.url.includes('/assets/games/')) {
                        localStorage.setItem('url', game.url);
                    }
                    else {
                        localStorage.setItem('url', "https://enchanteddonutstudioz.github.io/Spark-Games/" + game.url);
                    }
                    localStorage.setItem('image', game.image);
                    localStorage.setItem('name', game.name);
                    if (game.unofficial) {
                        localStorage.setItem('unofficial', true);
                    }
                    else {
                        localStorage.removeItem('unofficial');
                    }
                    window.location.href = "/play/" + localStorage.getItem('name');
                });

                const gamesContainer = document.getElementById('games');
                gamesContainer.appendChild(gameCard);
            })
        });
});

homeButton.addEventListener('click', () => {
    window.location.href = '/';
});