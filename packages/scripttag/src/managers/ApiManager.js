import makeRequest from '../helpers/api/makeRequest';
import {URL_CLIENT_API} from '../const/urlScriptTag';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const response = await makeRequest(URL_CLIENT_API + Shopify.shop);
    const {notifications, setting} = response.data;
    return {notifications, setting};
  };
}
