import {Firestore} from '@google-cloud/firestore';
import settingDefaultApp from '../const/defaultDataSetting';

const firestore = new Firestore();
const settingCollectionRef = firestore.collection('settings');

export async function getSettings(shopId) {
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

//todo nên update theo setting id
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
//todo ntn là lúc nào install app cũng tạo mới thì mình lấy setting nào . Check lại nhá
export async function initSettingDefault(shopifyDomain, shopId) {
  const defaultSetting = {...settingDefaultApp, shopifyDomain, shopId};
  const settingDocs = await settingCollectionRef.add(defaultSetting);
  return settingDocs.id;
}
