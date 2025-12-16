'use strict';
import { Field, ItemType } from "./field.js";
import * as sound from './sound.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

// Builder Pattern
export class GameBuilder {
  withGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withCarrotCount(num) {
    this.carrotCount = num;
    return this;
  }
  withBugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration,
      this.carrotCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.level = 1;
    this.gameDuration = gameDuration;
    this.baseCarrotCount = carrotCount;
    this.baseBugCount = bugCount;

    this.carrotCount = carrotCount;
    this.bugCount = bugCount;


    this.gameScore = document.querySelector(".game__score");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameBtn = document.querySelector(".game__button");
    this.gameLevel = document.querySelector(".game__level");
    this.updateLevelText();

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  };

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateLevelText() {
    this.gameLevel.innerText = `Level: ${this.level}`;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBGM();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBGM();
    this.onGameStop && this.onGameStop(reason);
  }

  nextLevel() {
    this.level++;
    this.carrotCount = (this.level) * 5;
    this.bugCount = (this.level) * 5;
    this.updateLevelText();
    this.gameField.updateItems(this.carrotCount, this.bugCount);
  }

  resetGame() {
    this.level = 1;
    this.carrotCount = this.baseCarrotCount;
    this.bugCount = this.baseBugCount;
    this.updateLevelText();
    this.gameField.updateItems(this.carrotCount, this.bugCount);

  }

  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount - this.score;
    this.gameField.init();
  }

  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';

  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }

}