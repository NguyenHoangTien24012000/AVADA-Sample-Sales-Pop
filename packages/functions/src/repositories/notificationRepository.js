import {getFirestore} from 'firebase-admin/firestore';

const db = getFirestore();
const notificationsCollectionRef = db.collection('notifications');

export const initSyncOrder = async order => {
  const orderDocs = await notificationsCollectionRef.add(order);
  return orderDocs.id;
};
