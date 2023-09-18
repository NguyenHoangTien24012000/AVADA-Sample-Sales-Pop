import {addNotification} from '../../repositories/notificationRepository';
import parseNotificationDataGraphql from '../../helpers/parseNotificationDataGraphql';
import getOrders from '../shopifyApi/getOrders';

export default async function syncOrderShop(shop) {
  const dataResult = await getOrders(shop);
  if (!dataResult) {
    return null;
  }
  const arrSyncNotifications = dataResult.map(order => {
    const {node} = order;
    const dataNotification = parseNotificationDataGraphql(node, shop);
    if (!dataNotification) {
      return null;
    }
    return addNotification(dataNotification);
  });
  Promise.all(arrSyncNotifications);
}
