'use strict';
const CARROT_SIZE = 80;
import * as sound from './sound.js';

export const ItemType = Object.freeze({
  carrot: 'carrot',
  bug: 'bug'
});

export class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldrect = this.field.getBoundingClientRect();
    this.field.addEventListener('click', this.onClick);
  }

  init() {
    this.field.innerHTML = '';
    this._addItem(ItemType.carrot, this.carrotCount, 'img/carrot.png');
    this._addItem(ItemType.bug, this.bugCount, 'img/bug.png');
  }

  updateItems(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldrect.width - CARROT_SIZE;
    const y2 = this.fieldrect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      if (className === ItemType.bug) {
        this._applyRandomBugMotion(item);
      }

      this.field.appendChild(item);
    }
  }

  _applyRandomBugMotion(bug) {
    const range = 30;
    bug.style.setProperty('--x1', `${randomNumber(-range, range)}px`);
    bug.style.setProperty('--y1', `${randomNumber(-range, range)}px`);
    bug.style.setProperty('--x2', `${randomNumber(-range, range)}px`);
    bug.style.setProperty('--y2', `${randomNumber(-range, range)}px`);
    bug.style.setProperty('--x3', `${randomNumber(-range, range)}px`);
    bug.style.setProperty('--y3', `${randomNumber(-range, range)}px`);

    const duration = randomNumber(0.8, 2.5);
    bug.style.animationDuration = `${duration}s`;

    const delay = randomNumber(0, 1.5);
    bug.style.animationDelay = `${delay}s`;
  }


  onClick = (event) => {
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      this.onItemClick && this.onItemClick(ItemType.carrot);
      sound.playCarrot();

    } else if (target.matches('.bug')) {
      sound.playBug();
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


