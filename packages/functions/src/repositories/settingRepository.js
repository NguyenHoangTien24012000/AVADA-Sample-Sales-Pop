import {Firestore} from '@google-cloud/firestore';
import settingDefaultApp from '../const/defaultDataSetting';

const firestore = new Firestore();
const collection = firestore.collection('settings');

export async function getSetting(shopId) {
  const settings = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settings.empty) {
    return null;
  }
  const setting = settings.docs[0];
  return {
    ...setting.data(),
    id: setting.id
  };
}

export async function updateSetting(setting) {
  const {id} = setting;
  const settingDocs = collection.doc(id);
  if (!settingDocs) {
    return null;
  }
  const resUpdate = await settingDocs.update(setting);
  return resUpdate;
}
export async function addSetting(shop) {
  const {shopifyDomain, id} = shop;
  const settingDocs = await collection
    .where('shopId', '==', id)
    .limit(1)
    .get();
  if (settingDocs.empty) {
    const defaultSetting = {...settingDefaultApp, shopifyDomain, shopId: id};
    const settingDocs = await collection.add(defaultSetting);
    return settingDocs.id;
  }
  return null;
}
