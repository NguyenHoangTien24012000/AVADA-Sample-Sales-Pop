import {Firestore} from '@google-cloud/firestore';
import {getPagData} from '../helpers/getPagDate';
import parseNotificationDataFireStore from '../helpers/parseNotificationDataFireStore';

const firestore = new Firestore();
const notificationsCollectionRef = firestore.collection('notifications');

export async function addNotification(notification) {
  const {orderId, productId} = notification;
  const notificationsDocs = await notificationsCollectionRef
    .where('orderId', '==', orderId)
    .where('productId', '==', productId)
    .limit(1)
    .get();
  if (notificationsDocs.empty) {
    const notificationDocs = await notificationsCollectionRef.add(notification);
    return notificationDocs.id;
  }
  return null;
}

export async function getNotifications(shopId, objQuery) {
  const {sort, limit} = objQuery;
  const sortValue = sort.split(':')[1];
  const notificationsDocsRef = notificationsCollectionRef
    .where('shopId', '==', shopId)
    .orderBy('timestamp', sortValue);

  const {data, hasNext, hasPre} = await getPagData(
    notificationsDocsRef,
    notificationsCollectionRef,
    objQuery,
    parseInt(limit)
  );
  return {data, hasNext, hasPre};
}

export async function getNotificationsClientApi(shopId) {
  const notificationDocs = await notificationsCollectionRef.where('shopId', '==', shopId).get();
  if (notificationDocs.empty) {
    return [];
  }
  const data = notificationDocs.docs.map(doc => parseNotificationDataFireStore(doc, true));
  return data;
}
