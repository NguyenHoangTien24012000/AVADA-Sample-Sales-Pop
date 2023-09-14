import moment from 'moment';
export default function parseNotificationDataFireStore(doc, clientApi = false) {
  ({
    ...doc.data(),
    id: doc.id
  });
  const data = doc.data();
  const id = doc.id;
  let timestamp = data.timestamp._seconds * 1000;
  if (clientApi) {
    timestamp = moment(data.timestamp._seconds * 1000).fromNow();
  }
  return {...data, id, timestamp};
}
