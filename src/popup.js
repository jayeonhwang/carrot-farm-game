'use strict';
import { Reason } from "./game.js";
export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__message");
    this.popUpNextLevel = document.querySelector(".pop-up__next_level");
    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
    this.popUpNextLevel.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });

  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.popUp.classList.add('pop-up--hide');
  }

  show(reason) {

    this.popUp.classList.remove('pop-up--hide');
    this.popUpRefresh.classList.add('pop-up-btn--hide');
    this.popUpNextLevel.classList.add('pop-up-btn--hide');

    switch (reason) {
      case Reason.win:
        this.popUpText.textContent = 'YOU WIN 🎉';
        this.popUpNextLevel.classList.remove('pop-up-btn--hide');

        break;

      case Reason.lose:
        this.popUpText.textContent = 'YOU LOSE 😭';
        this.popUpRefresh.classList.remove('pop-up-btn--hide');
        this.popUpRefresh.onclick = () => this.onRetry();
        break;

      case Reason.cancel:
        this.popUpText.textContent = 'Replay ❓';
        this.popUpRefresh.classList.remove('pop-up-btn--hide');
        this.popUpRefresh.onclick = () => this.onRetry();
        break;

    }
  }

}

