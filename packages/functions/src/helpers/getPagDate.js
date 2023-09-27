/**
 * @param objRef
 * @param collection
 * @param query
 * @param limit
 * @returns {Promise<{data: *[], hasNext: boolean, hasPre: boolean}>}
 */

import parseNotificationDataFireStore from '../presenters/parseNotificationDataFireStore';

export async function getPagData(objRef, collection, query, limit = 1) {
  let hasPre = false;
  let hasNext = false;
  if (query.after) {
    const after = await collection.doc(query.after).get();
    objRef = objRef.startAfter(after);
    hasPre = true;
  }
  if (query.before) {
    const before = await collection.doc(query.before).get();
    objRef = objRef.endBefore(before).limitToLast(limit);
    hasNext = true;
  } else {
    objRef = objRef.limit(limit);
  }
  const objDocs = await objRef.get();
  const data = objDocs.docs.map(doc => parseNotificationDataFireStore(doc));
  if (!hasPre) {
    hasPre = await verifyHasPre(objDocs, objRef);
  }
  if (!hasNext) {
    hasNext = await verifyHasNext(objDocs, objRef);
  }
  return {data, docs: objDocs, hasPre, hasNext};
}

async function verifyHasPre(objDocs, objRef) {
  if (objDocs.size === 0) {
    return false;
  }
  const preRef = await objRef
    .endBefore(objDocs.docs[0])
    .limitToLast(1)
    .get();
  return preRef.size > 0;
}

async function verifyHasNext(objDocs, objRef) {
  if (objDocs.size === 0) {
    return false;
  }
  const nextRef = await objRef
    .startAfter(objDocs.docs[objDocs.size - 1])
    .limit(1)
    .get();
  return nextRef.size > 0;
}
