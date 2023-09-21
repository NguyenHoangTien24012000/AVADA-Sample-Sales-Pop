import makeRequest from '../helpers/api/makeRequest';
import {URL_CLIENT_API} from '../const/urlScriptTag';
export default class ApiManager {
  getNotificationsSetting = async () => {
    const {setting, notifications} = await this.getApiData(URL_CLIENT_API + window.Shopify.shop);
    return {setting, notifications};
  };

  getApiData = async url => {
    const response = await makeRequest(url);
    return response.data;
  };
}
