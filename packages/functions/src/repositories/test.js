import admin from 'firebase-admin';
import {getFirestore} from 'firebase-admin/firestore';
import serviceAccount from '../../serviceAccount.development.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default async function test() {
  console.log('TEST');
}
