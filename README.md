# Carrot Farm Game

![image description](https://jayeonhwang.github.io/carrot-farm-game/img/og.webp)

### [>> Demo Website](https://jayeonhwang.github.io/carrot-farm-game/)

This is a simple browser game created to practice Web APIs and DOM event handling.  
The player clicks carrots while avoiding moving bugs.  
If all carrots are collected, the player wins and moves to the next level.  
The game ends when the player clicks a bug or when the time runs out.

### Features

- Randomly displays carrots and bugs on the field
- Score, timer, and stop button
- Score increases when a carrot is clicked
- Game over when a bug is clicked or time runs out
- Level-up system that increases the number of carrots and bugs
- Different popup messages for win, lose, and stop states
- Sound effects for game interactions

### Screenshots

<img src="./img/screenshot-game.png" width = "350">
<img src="./img/screenshot-levelup.png" width = "350">
<img src="./img/screenshot-popup.png" width = "350">

### Tech Stack

- HTML
- CSS
- Javascript

### Key learning

- Used browser Web APIs such as Audio and window coordinates
- Structured game logic using classes with clear responsibilities
- Organized the project into modular JavaScript files and connected them using ES modules
- Designed clear function and class names to improve code readability
- Implemented CSS animations using `transform` and `@keyframes`

### Challenges & Solutions

- After separating features using a class-based architecture, adding a level-up feature became difficult because game logic and popup UI control were tightly coupled

  → I solved this by clearly defining class responsibilities, moving the level-up logic into the Game class, and passing the game result (Reason) from main to the popup component

- The score was not calculated correctly after leveling up.

  → I used console.log() to debug multiple functions and found that addEventListener was registered multiple times in gameField and the nextLevel function. I fixed this by removing the duplicated event listeners

### Future Improvements

- Add a pause feature to stop the game during play

- Use local storage to save the highest level achieved

### How to run Locally

```
git clone https://github.com/jayeonhwang/carrot-farm-game.git
```

```
cd carrot-farm-game
```

```
open index.html
```

### Author

- GitHub: https://github.com/jayeonhwang
- Portfolio: https://jayeonhwang.github.io/portfolio-website/
- Email: jayeon512@gmail.com
