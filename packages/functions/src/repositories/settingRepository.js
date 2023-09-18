import {Firestore} from '@google-cloud/firestore';
import settingDefaultApp from '../const/defaultDataSetting';

const firestore = new Firestore();
const settingCollectionRef = firestore.collection('settings');

export async function getSetting(shopId) {
  const settingDocs = await settingCollectionRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    return null;
  }
  const settingDoc = settingDocs.docs[0];
  return {
    ...settingDoc.data(),
    id: settingDoc.id
  };
}

export async function updateSetting(settings) {
  const {id} = settings;
  const settingDocs = settingCollectionRef.doc(id);
  if (!settingDocs) {
    return null;
  }
  const resUpdate = await settingDocs.update(settings);
  return resUpdate;
}
export async function addSetting(shop) {
  const {shopifyDomain, id} = shop;
  const settingDocs = await settingCollectionRef
    .where('shopId', '==', id)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    const defaultSetting = {...settingDefaultApp, shopifyDomain, shopId};
    const settingDocs = await settingCollectionRef.add(defaultSetting);
    return settingDocs.id;
  }
  return null;
}
