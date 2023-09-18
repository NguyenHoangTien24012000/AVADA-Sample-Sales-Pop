import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, setting} = await apiManager.getNotifications();
  displayManager.initialize({notifications, setting});
  displayManager.runningPopup();
})();
