# Contributing to Spark

Devs, read this

# ADDING MORE GAMES
EXAMPLE:
```json
    {
        "name": "Doge Miner", //NAME OF THE GAME
        "image": "/assets/imgs/games/dogeminer.png", // MAKE SURE TO USE A LOCAL IMAGE, DOWNLOAD GAME IMAGE/LOGO FILES TO /assets/imgs/games/
        "url": "https://dogeminer.github.io/game.html", //MAKE SURE IT IS A DIRECT LINK TO THE GAME, FULLSCREEN, NO ADS
        "tags": [
            "2D",
            "Idle",
            "Strategy",
            "Upgrade"
        ], //MAKE SURE THESE TAGS ARE ACCURATE. THERE SHOULD BE A LIST OF TAGS TO CHOOSE FROM.
        "special": [
            "hot",
            "hr"
        ], //hot = HOT, hr = Highly Rated, new = NEW
        "size": "m", //s = Small, m = Medium, l = Large
"unofficial": false //SET UNOFFICIAL TO TRUE IF IT IS A GAME WITH UNREMOVABLE ADS SUCH AS PUBLIC IO GAMES LIKE DIEP.IO OR SOMETHING
    },
```
For the game URL, you can take games from https://github.com/EnchantedDonutStudioz/Spark-Games. In order to do this, just make the URL of the game "DogeMiner" to take the Doge Miner files directly from https://enchanteddonutstudioz.github.io/Spark-Games/. For example:

```json
    {
        "name": "Doge Miner",
        "image": "/assets/imgs/games/dogeminer.png",
        "url": "DogeMiner", //Automatically redirects to https://enchanteddonutstudioz.github.io/Spark-Games/DogeMiner
        "tags": [
            "2D",
            "Idle",
            "Strategy",
            "Upgrade"
        ],
        "special": [
            "hot",
            "hr"
        ],
        "size": "m",
"unofficial": false
    },
```

# PLEASE ADD ALL THE GAMES YOU CAN IN YOUR FREE TIME. WE NEED 1000+ GAMES BY MAY 3RD!

THANK YOU FOR CONTRIBUTING TO SPARK!
