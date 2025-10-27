'use strict';
import Field from "./field.js";
import * as sound from './sound.js';

export default class Game {
  constructor(gameDration, carrotCount, bugCount) {
    this.gameDration = gameDration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameScore = document.querySelector(".game__score");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameBtn = document.querySelector(".game__button");

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stop();
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
    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if (item === 'bug') {
      this.finish(false);
    }
  };

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
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

  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBGM();
    sound.playAlert();
    this.onGameStop && this.onGameStop('cancel');
  }

  finish(win) {
    this.started = false;
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    sound.stopBGM();
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win ? 'win' : 'lose');
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
    let remainingTimeSec = this.gameDration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
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