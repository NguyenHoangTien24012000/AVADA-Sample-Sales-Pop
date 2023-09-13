import {Firestore} from '@google-cloud/firestore';
import {getPagData} from '../helpers/getPagDate';

const firestore = new Firestore();
const notificationsCollectionRef = firestore.collection('notifications');

export async function addNotification(notification) {
  const {orderId, productId} = notification;
  const orderDocs = await notificationsCollectionRef
    .where('orderId', '==', orderId)
    .where('productId', '==', productId)
    .limit(1)
    .get();
  if (orderDocs.empty) {
    const notificationDocs = await notificationsCollectionRef.add(notification);
    return notificationDocs.id;
  }
  return null;
}

export async function getNotifications(shopId, objQuery) {
  const {sort, limit} = objQuery;
  const sortValue = sort.split(':')[1];
  const objRef = notificationsCollectionRef
    .where('shopId', '==', shopId)
    .orderBy('timestamp', sortValue);

  const {data, hasNext, hasPre} = await getPagData(
    objRef,
    notificationsCollectionRef,
    objQuery,
    parseInt(limit)
  );
  return {data, hasNext, hasPre};
}
