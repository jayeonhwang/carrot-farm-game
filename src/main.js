
'use strict';
import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";
import * as sound from './sound.js';


let itemCount = 5;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(itemCount)
  .withBugCount(itemCount)
  .build();


game.setGameStopListener(reason => {
  switch (reason) {
    case Reason.cancel:
      sound.playAlert();
      break;
    case Reason.win:
      sound.playWin();
      break;
    case Reason.lose:
      sound.playBug();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.show(reason);
});


gameFinishBanner.setClickListener(() => {
  if (Reason.win) {
    itemCount++;
    game.start();
  } else {
    itemCount = 5;
    game.start();
  }
});


