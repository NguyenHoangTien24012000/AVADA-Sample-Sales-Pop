import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const notificationsCollectionRef = firestore.collection('notifications');

export async function initSyncOrderNotification(order) {
  const notificationDocs = await notificationsCollectionRef.add(order);
  return notificationDocs.id;
}

export async function getNotifications() {
  const notificationDocs = await notificationsCollectionRef.get();
  if (notificationDocs.empty) {
    return null;
  }
  const result = [];
  notificationDocs.forEach(notification => {
    const data = notification.data();
    const {timestamp} = data;
    result.push({...data, timestamp: timestamp._seconds * 1000});
  });
  return result;
}
