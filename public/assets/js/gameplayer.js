const gameFrame = document.getElementById('gameframe');
const fullscreenButton = document.getElementById('fullscreen-button');
const bugButton = document.getElementById('bug-button');
const unofficial = document.getElementById('unofficial');
const gameNameElement = document.getElementById('game-name-title');
const gameImage = document.getElementById('gamelogo');
const toolbox = document.getElementById('toolbox');
var gameName = localStorage.getItem('name');
var gameNameUrl;
var gameUrl;


document.title = gameName + " - Play Games Online for Free on Spark";

document.addEventListener('DOMContentLoaded', function () {
  fetch('/assets/json/games.json')
    .then(response => response.json())
    .then(games => {
      if (window.location.href.includes("/~/")) {

        gameNameUrl = decodeURIComponent(window.location.href.split("/~/")[1]);
        document.title = gameNameUrl + " - Play Games Online for Free on Spark";


        const game = games.find(g => g.name === gameNameUrl);

        if (game) {

          localStorage.setItem('name', game.name);
          localStorage.setItem('image', game.image);

          if (game.url.includes('https://') || game.url.includes('http://')) {
            localStorage.setItem('url', game.url);
          } else {
            localStorage.setItem('url', "https://enchanteddonutstudioz.github.io/Spark-Games/" + game.url);
          }

          gameUrl = localStorage.getItem('url');


          if (game.unofficial) {
            localStorage.setItem('unofficial', true);
          } else {
            localStorage.removeItem('unofficial');
          }
        }
      } else {
        gameNameUrl = localStorage.getItem('name');
      }


      gameName = localStorage.getItem('name');
      gameUrl = localStorage.getItem('url');
      document.title = gameName + " - Play Games Online for Free on Spark";
      gameFrame.src = gameUrl;
      gameImage.src = localStorage.getItem('image');
      gameNameElement.textContent = gameName;

      games.sort(() => Math.random() - 0.5);
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
        gameImage.src = game.image;
        gameImage.alt = game.name;
        gameImage.className = 'game-image';

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
          if (game.url.includes('https://') || game.url.includes('http://')) {
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
          window.location.href = "/~/" + localStorage.getItem('name');
        });

        const gamesContainer = document.getElementById('more-games');
        gamesContainer.appendChild(gameCard);
      })
    });
});

if (localStorage.getItem('unofficial')) {
  unofficial.style.display = 'block';
  document.getElementById('unofficial-close').addEventListener('click', () => {
    localStorage.removeItem('unofficial');
    unofficial.style.display = 'none';
  });
  localStorage.removeItem('unofficial');
}
else {
  unofficial.style.display = 'none';
}




fullscreenButton.addEventListener('click', () => {
  if (gameFrame.requestFullscreen) {
    gameFrame.requestFullscreen();
  } else if (gameFrame.mozRequestFullScreen) {
    gameFrame.mozRequestFullScreen();
  } else if (gameFrame.webkitRequestFullscreen) {
    gameFrame.webkitRequestFullscreen();
  } else if (gameFrame.msRequestFullscreen) {
    gameFrame.msRequestFullscreen();
  }
});

gameImage.src = localStorage.getItem('image');
gameNameElement.textContent = localStorage.getItem('name');

bugButton.addEventListener('click', () => {
  const currentGame = localStorage.getItem('name');

  const modal = document.createElement('div');
  modal.className = 'bug-report-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  modal.style.opacity = '0';
  modal.style.transition = 'opacity 0.3s ease-in-out';

  const modalContent = document.createElement('div');
  modalContent.className = 'bug-report-modal-content';
  modalContent.style.backgroundColor = 'var(--secondary)';
  modalContent.style.color = 'var(--primary)';
  modalContent.style.padding = '25px';
  modalContent.style.borderRadius = 'var(--card-radius)';
  modalContent.style.width = '500px';
  modalContent.style.maxWidth = '90%';
  modalContent.style.boxShadow = 'var(--card-shadow-hover)';
  modalContent.style.transform = 'translateY(20px)';
  modalContent.style.transition = 'transform 0.4s ease-out';
  modalContent.style.border = '2px solid var(--accent)';
  modalContent.style.backdropFilter = 'blur(5px)';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'bug-report-modal-header';
  modalHeader.style.display = 'flex';
  modalHeader.style.justifyContent = 'space-between';
  modalHeader.style.alignItems = 'center';
  modalHeader.style.marginBottom = '20px';
  modalHeader.style.borderBottom = '2px solid var(--accent)';
  modalHeader.style.paddingBottom = '10px';

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = `Report a Bug: ${currentGame}`;
  modalTitle.style.margin = '0';
  modalTitle.style.color = 'var(--primary)';
  modalTitle.style.fontFamily = "'font', sans-serif";
  modalTitle.style.fontSize = '1.5rem';

  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '28px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = 'var(--primary)';
  closeButton.style.transition = 'transform 0.2s ease, color 0.2s ease';
  closeButton.onmouseover = () => {
    closeButton.style.transform = 'scale(1.2)';
    closeButton.style.color = 'var(--accent)';
  };
  closeButton.onmouseout = () => {
    closeButton.style.transform = 'scale(1)';
    closeButton.style.color = 'var(--primary)';
  };
  closeButton.onclick = () => {
    modalContent.style.transform = 'translateY(20px)';
    modal.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const form = document.createElement('form');
  form.className = 'bug-report-form';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Please describe the bug you encountered in detail...';
  textarea.style.width = '100%';
  textarea.style.height = '150px';
  textarea.style.padding = '12px';
  textarea.style.marginBottom = '20px';
  textarea.style.boxSizing = 'border-box';
  textarea.style.border = '1px solid var(--accent)';
  textarea.style.borderRadius = '10px';
  textarea.style.resize = 'vertical';
  textarea.style.backgroundColor = 'rgba(255, 237, 158, 0.1)';
  textarea.style.color = 'white';
  textarea.style.fontFamily = "'font', sans-serif";
  textarea.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';
  textarea.style.outline = 'none';
  textarea.required = true;

  textarea.onfocus = () => {
    textarea.style.borderColor = 'var(--accent)';
    textarea.style.boxShadow = '0 0 8px var(--accent)';
  };

  textarea.onblur = () => {
    textarea.style.boxShadow = 'none';
  };

  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.justifyContent = 'flex-end';
  buttonsContainer.style.gap = '15px';

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.type = 'button';
  cancelButton.style.padding = '10px 18px';
  cancelButton.style.background = 'rgba(255, 255, 255, 0.1)';
  cancelButton.style.color = 'var(--primary)';
  cancelButton.style.border = '1px solid var(--primary)';
  cancelButton.style.borderRadius = '8px';
  cancelButton.style.cursor = 'pointer';
  cancelButton.style.fontFamily = "'font', sans-serif";
  cancelButton.style.transition = 'all 0.2s ease';

  cancelButton.onmouseover = () => {
    cancelButton.style.background = 'rgba(255, 255, 255, 0.2)';
    cancelButton.style.transform = 'translateY(-2px)';
  };

  cancelButton.onmouseout = () => {
    cancelButton.style.background = 'rgba(255, 255, 255, 0.1)';
    cancelButton.style.transform = 'translateY(0)';
  };

  cancelButton.onclick = () => {
    modalContent.style.transform = 'translateY(20px)';
    modal.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  };

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit Report';
  submitButton.type = 'submit';
  submitButton.style.padding = '10px 18px';
  submitButton.style.background = 'var(--accent)';
  submitButton.style.color = 'var(--secondary)';
  submitButton.style.border = 'none';
  submitButton.style.borderRadius = '8px';
  submitButton.style.cursor = 'pointer';
  submitButton.style.fontFamily = "'font', sans-serif";
  submitButton.style.fontWeight = 'bold';
  submitButton.style.transition = 'all 0.2s ease';
  submitButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

  submitButton.onmouseover = () => {
    submitButton.style.transform = 'translateY(-2px)';
    submitButton.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
    submitButton.style.background = '#ffb733';
  };

  submitButton.onmouseout = () => {
    submitButton.style.transform = 'translateY(0)';
    submitButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    submitButton.style.background = 'var(--accent)';
  };

  const statusMessage = document.createElement('div');
  statusMessage.style.marginTop = '15px';
  statusMessage.style.padding = '12px';
  statusMessage.style.borderRadius = '8px';
  statusMessage.style.textAlign = 'center';
  statusMessage.style.display = 'none';
  statusMessage.style.fontFamily = "'font', sans-serif";
  statusMessage.style.transition = 'opacity 0.3s ease';

  buttonsContainer.appendChild(cancelButton);
  buttonsContainer.appendChild(submitButton);

  form.appendChild(textarea);
  form.appendChild(buttonsContainer);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(form);
  modalContent.appendChild(statusMessage);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.style.opacity = '1';
    modalContent.style.transform = 'translateY(0)';
  }, 10);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userReport = textarea.value.trim();

    if (!userReport) {
      textarea.style.borderColor = '#f44336';
      textarea.style.boxShadow = '0 0 8px #f44336';
      textarea.focus();
      return;
    }

    textarea.disabled = true;
    cancelButton.disabled = true;
    submitButton.disabled = true;

    submitButton.innerHTML = '<span class="loading-dots">Sending</span>';
    const loadingDots = document.querySelector('.loading-dots');
    loadingDots.style.position = 'relative';

    let dotCount = 0;
    const loadingInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      loadingDots.textContent = 'Sending' + '.'.repeat(dotCount);
    }, 300);

    const webhookURL = 'https://discord.com/api/webhooks/1360759070042095718/fsrPZfwC5dcnDEcdC6fEbFTz8FXrkB2n7Sdb1-Td3VLzvx4yeFpgbVsuEVYtsjiD7zfQ';
    const message = {
      content: `**Bug Report for ${currentGame}**`,
      embeds: [{
        title: 'Bug Report',
        description: userReport,
        color: 16755200,
        fields: [
          {
            name: 'Game',
            value: currentGame,
            inline: true
          },
          {
            name: 'Game URL',
            value: localStorage.getItem('url'),
            inline: true
          },
          {
            name: 'Reported At',
            value: new Date().toLocaleString(),
            inline: true
          }
        ]
      }]
    };

    fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
      .then(response => {
        clearInterval(loadingInterval);

        if (response.ok) {
          statusMessage.textContent = 'Bug report submitted successfully. Thank you!';
          statusMessage.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
          statusMessage.style.color = '#4CAF50';
          statusMessage.style.border = '1px solid #4CAF50';
          statusMessage.style.display = 'block';
          statusMessage.style.opacity = '0';

          setTimeout(() => {
            statusMessage.style.opacity = '1';
          }, 10);

          setTimeout(() => {
            modalContent.style.transform = 'translateY(20px)';
            modal.style.opacity = '0';
            setTimeout(() => {
              document.body.removeChild(modal);
            }, 300);
          }, 2000);
        } else {
          statusMessage.textContent = 'Failed to submit bug report. Please try again later.';
          statusMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
          statusMessage.style.color = '#f44336';
          statusMessage.style.border = '1px solid #f44336';
          statusMessage.style.display = 'block';
          statusMessage.style.opacity = '0';

          setTimeout(() => {
            statusMessage.style.opacity = '1';
          }, 10);

          textarea.disabled = false;
          cancelButton.disabled = false;
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Report';

          console.error('Error submitting bug report:', response.statusText);
        }
      })
      .catch(error => {
        clearInterval(loadingInterval);

        statusMessage.textContent = 'Failed to submit bug report. Please try again later.';
        statusMessage.style.backgroundColor = 'rgba(244, 67, 54, 0.2)';
        statusMessage.style.color = '#f44336';
        statusMessage.style.border = '1px solid #f44336';
        statusMessage.style.display = 'block';
        statusMessage.style.opacity = '0';

        setTimeout(() => {
          statusMessage.style.opacity = '1';
        }, 10);

        textarea.disabled = false;
        cancelButton.disabled = false;
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Report';

        console.error('Error submitting bug report:', error);
      });
  });
});

// Add this code after the existing code in gameplayer.js

// Function to adjust game container grid positioning based on screen size
function adjustGameContainerGrid() {
  const gameContainer = document.querySelector('.game-container');
  const unofficialElement = document.getElementById('unofficial');

  if (!gameContainer) return;

  const viewportWidth = window.innerWidth;
  if (viewportWidth >= 2800) {
    // For people with no life [CASE OH SIZE SCREEN]
    gameContainer.style.gridRowStart = '1';
    gameContainer.style.gridRowEnd = '13';
    gameContainer.style.gridColumnStart = '2';
    gameContainer.style.gridColumnEnd = '31';
    gameContainer.style.maxWidth = '4530px';
    gameContainer.style.height = '1420px';
  }
  else if (viewportWidth >= 2200) {
    // For chungus screens
    gameContainer.style.gridRowStart = '1';
    gameContainer.style.gridRowEnd = '10';
    gameContainer.style.gridColumnStart = '2';
    gameContainer.style.gridColumnEnd = '21';
    gameContainer.style.maxWidth = '2530px';
    gameContainer.style.height = '1060px';
  }
  else if (viewportWidth >= 1800) {
    // For large screens
    gameContainer.style.gridRowStart = '1';
    gameContainer.style.gridRowEnd = '8';
    gameContainer.style.gridColumnStart = '2';
    gameContainer.style.gridColumnEnd = '15';
    gameContainer.style.maxWidth = '2030px';
    gameContainer.style.height = '820px';
  }
  else if (viewportWidth >= 1200) {
    // For normal screens
    gameContainer.style.gridRowStart = '1';
    gameContainer.style.gridRowEnd = '6';
    gameContainer.style.gridColumnStart = '2';
    gameContainer.style.gridColumnEnd = '10';
    gameContainer.style.maxWidth = '930px';
    gameContainer.style.height = '580px';
  }
  else {
    // For small screens
    gameContainer.style.gridRowStart = '1';
    gameContainer.style.gridRowEnd = '8';
    gameContainer.style.gridColumnStart = '2';
    gameContainer.style.gridColumnEnd = '6';
    gameContainer.style.maxWidth = '930px';
    gameContainer.style.height = '820px';
  }
}

// Run the adjustment function on page load
document.addEventListener('DOMContentLoaded', function () {
  // Make sure this runs after the games are loaded
  setTimeout(adjustGameContainerGrid, 100);

  // Also run when the window is resized
  window.addEventListener('resize', adjustGameContainerGrid);
});

toolbox.addEventListener('click', () => {
  window.location.href = "/";
});