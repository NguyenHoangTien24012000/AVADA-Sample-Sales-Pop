import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import lazy from 'preact-lazy';
import {checkCookie, setCookie, getCookie} from '../helpers/setCookie';
const NotificationPopup = lazy(() => import('../components/NotificationPopup/NotificationPopup'));

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.setting = {};
  }
  async initialize({notifications, setting}) {
    this.notifications = notifications;
    this.setting = setting;
    this.insertContainer();
    const hasCookie = checkCookie('fadeout');
    if (!hasCookie) {
      setCookie('fadeout', 0, 1);
    }
    if (!this.shouldStartDisplay()) return;
    this.initiateDisplay();
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'none';
  }

  onClosePopup() {
    const container = document.querySelector('#Avada-SalePop');
    if (container) {
      container.remove();
    }
    setCookie('fadeout', 1, 1);
  }

  display(notification) {
    const container = document.querySelector('#Avada-SalePop');
    render(
      <NotificationPopup
        {...notification}
        position={this.setting.position}
        hideTimeAgo={this.setting.hideTimeAgo}
        truncateProductName={this.setting.truncateProductName}
        onClosePopup={this.onClosePopup}
      />,
      container
    );
    container.style.display = 'block';
  }

  shouldStartDisplay() {
    const fadeOut = getCookie('fadeout');
    if (!this.checkUrlPage() || fadeOut === '1') return false;
    return true;
  }

  checkUrlPage() {
    const {includedUrls, excludedUrls, allowShow} = this.setting;
    const arrIncludedUrls = includedUrls.match(/https?:\/\/([\S]+)/g) || [];
    const arrExcludedUrls = excludedUrls.match(/https?:\/\/([\S]+)/g) || [];
    let URL_PAGE = window.location.origin + window.location.pathname;
    if (URL_PAGE.endsWith('/')) {
      URL_PAGE = /(.+(?=\/))/.exec(URL_PAGE)[0];
    }
    if (allowShow === 'specific' && !arrIncludedUrls.includes(URL_PAGE)) {
      return false;
    }
    if (allowShow === 'all' && arrExcludedUrls.includes(URL_PAGE)) {
      return false;
    }
    return true;
  }

  delay(delayInms) {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }

  async initiateDisplay() {
    let {firstDelay, displayDuration, popsInterval} = this.setting;
    firstDelay = parseInt(firstDelay) * 1000;
    displayDuration = parseInt(displayDuration) * 1000;
    popsInterval = parseInt(popsInterval) * 1000;

    await this.delay(firstDelay);
    for (const notification of this.notifications) {
      this.display(notification);
      await this.delay(displayDuration);
      this.fadeOut();
      await this.delay(popsInterval);
    }
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
