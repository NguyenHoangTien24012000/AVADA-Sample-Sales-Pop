import moment from 'moment';

export default function parseNotificationDataFireStore(doc, clientApi = false) {
  ({
    ...doc.data(),
    id: doc.id
  });
  const data = doc.data();
  const id = doc.id;
  let timestamp = data.timestamp.toDate();
  if (clientApi) {
    timestamp = moment(data.timestamp.toDate()).fromNow();
    const {shopId, ...dataClientApi} = data;
    return {...dataClientApi, timestamp};
  }
  return {...data, id, timestamp};
}
