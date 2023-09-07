import admin from 'firebase-admin';
import {getFirestore, Timestamp} from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccount.development.json';
import defaultDataSettings from '../const/defaultDataSetting';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const settingCollectionRef = db.collection('settings');

export async function getSettings(shopId) {
  const settingDocs = await settingCollectionRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    const newSetting = await settingCollectionRef.add({...defaultDataSettings, shopId: shopId});
    const data = (await newSetting.get()).data();
    return data;
  }
  const settingDoc = settingDocs.docs[0];
  return {
    ...settingDoc.data(),
    id: settingDoc.id
  };
}

export async function updateSettings(shopId, settings) {
  const settingDocs = await settingCollectionRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    return null;
  }
  const resUpdate = await settingDocs.docs[0].ref.update(settings);
  return resUpdate;
}
