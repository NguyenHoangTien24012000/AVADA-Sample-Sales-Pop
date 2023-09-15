import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, setting} = await apiManager.getNotifications();
  displayManager.initialize({notifications, setting});
  const {includedUrls, excludedUrls, allowShow} = setting;
  const arrIncludedUrls = includedUrls.split('\n');
  const arrExcludedUrls = excludedUrls.split('\n');
  const URL_PAGE = window.location.href;
  if (allowShow === 'specific' && new Set(arrExcludedUrls).has(URL_PAGE)) {
    return;
  }
  if (allowShow === 'all' && !new Set(arrIncludedUrls).has(URL_PAGE)) {
    return;
  }
  displayManager.runningPopup();
})();
