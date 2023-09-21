import {Firestore} from '@google-cloud/firestore';
import {getPagData} from '../helpers/getPagDate';
import parseNotificationDataFireStore from '../presenters/parseNotificationDataFireStore';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export async function addNotification(notification) {
  const {orderId} = notification;
  const notifications = await collection
    .where('orderId', '==', orderId)
    .limit(1)
    .get();
  if (notifications.empty) {
    const notificationNew = await collection.add(notification);
    return notificationNew.id;
  }
  return null;
}

export async function getNotifications(shopId, objQuery) {
  const {sort, limit} = objQuery;
  const sortValue = sort.split(':')[1];
  const notificationsDocs = collection
    .where('shopId', '==', shopId)
    .orderBy('timestamp', sortValue);

  const {data, hasNext, hasPre} = await getPagData(
    notificationsDocs,
    collection,
    objQuery,
    parseInt(limit)
  );
  return {data, hasNext, hasPre};
}

export async function getNotificationsClientApi(shopId, maxPopsDisplay) {
  const notifications = await collection
    .where('shopId', '==', shopId)
    .orderBy('timestamp', 'desc')
    .limit(maxPopsDisplay)
    .get();
  if (notifications.empty) {
    return [];
  }
  const data = notifications.docs.map(doc => parseNotificationDataFireStore(doc, true));
  return data;
}
