
'use strict';
import PopUp from "./popup.js";
import GameBuilder from "./game.js";


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(5)
  .withBugCount(5)
  .build();

gameFinishBanner.setClickListener(() => {
  game.start();
});


game.setGameStopListener(reason => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay ❓';
      break;
    case 'win':
      message = 'You win 🎉';
      break;
    case 'lose':
      message = 'You lose 😭';
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});


