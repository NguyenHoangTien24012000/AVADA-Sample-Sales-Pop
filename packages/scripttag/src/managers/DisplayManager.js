import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import lazy from 'preact-lazy';
import {checkCookie, setCookie, getCookie} from '../helpers/setCookieOnFadeOut';
const NotificationPopup = lazy(() => import('../components/NotificationPopup/NotificationPopup'));

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }
  async initialize({notifications, setting}) {
    this.notifications = notifications;
    this.settings = setting;
    const hasCookie = checkCookie('fadeout');
    this.insertContainer();
    if (!hasCookie) {
      setCookie('fadeout', 0, 1);
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
    setCookie('fadeout', 1, 1);
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

  checkUrlPage() {
    const {includedUrls, excludedUrls, allowShow} = this.settings;
    const arrIncludedUrls = includedUrls.split('\n').map(item => item.trim());
    const arrExcludedUrls = excludedUrls.split('\n').map(item => item.trim());
    let URL_PAGE = window.location.href;
    if (URL_PAGE.endsWith('/')) {
      URL_PAGE = /(.+(?=\/))/.exec(URL_PAGE)[0];
    }
    if (allowShow === 'specific' && arrExcludedUrls.includes(URL_PAGE)) {
      return false;
    }
    if (allowShow === 'all' && !arrIncludedUrls.includes(URL_PAGE)) {
      return false;
    }
    return true;
  }

  async runningPopup() {
    const fadeOut = getCookie('fadeout');
    if (!this.checkUrlPage() || fadeOut === '1') return;
    let {firstDelay, displayDuration, popsInterval} = this.settings;
    firstDelay = parseInt(firstDelay) * 1000;
    displayDuration = parseInt(displayDuration) * 1000;
    popsInterval = parseInt(popsInterval) * 1000;
    const delay = delayInms => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    };
    await delay(firstDelay);
    for (let index = 0; index < this.notifications.length; index++) {
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
