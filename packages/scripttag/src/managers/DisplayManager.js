import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, setting}) {
    this.notifications = notifications;
    this.settings = setting;
    this.insertContainer();
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display(notification) {
    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        notification={notification}
        settings={this.settings}
        fadeOut={this.fadeOut}
      />,
      container
    );
    container.style.display = 'block';
  }

  hidden() {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'none';
  }

  async runningPopup() {
    let {firstDelay, displayDuration, popsInterval} = this.settings;
    firstDelay = parseInt(firstDelay) * 1000;
    displayDuration = parseInt(displayDuration) * 1000;
    popsInterval = parseInt(popsInterval) * 1000;
    const delay = delayInms => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    };
    await delay(firstDelay);
    for (let index = 0; index < this.notifications.length; index++) {
      console.log(index);
      this.display(this.notifications[index]);
      await delay(displayDuration);
      this.hidden();
      await delay(popsInterval);
    }
    this.fadeOut();
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }
    return popupEl;
  }
}
