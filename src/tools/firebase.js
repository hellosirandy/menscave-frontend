import firebase from 'firebase';
import 'firebase/app';

const config = {
  apiKey: "AIzaSyB3ZbI_u_TywJCbNz1sMp5-d6bVVldSovc",
  authDomain: "menscave-620ba.firebaseapp.com",
  databaseURL: "https://menscave-620ba.firebaseio.com",
  projectId: "menscave-620ba",
  storageBucket: "menscave-620ba.appspot.com",
  messagingSenderId: "1047834325271"
}

const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database();
export const databaseRef = database.ref();
export const auth = firebase.auth();
export const storage = firebase.storage();

export function fetchArticle(category):Promise<resolve> {
  let promise;
  if (category === 'all') {
    promise = databaseRef.child('articles').once('value', snapshot => {
      return Promise.resolve(snapshot);
    });
  } else {
    promise = databaseRef.child('articles').orderByChild('category').equalTo(category).once('value', snapshot => {
      return Promise.resolve(snapshot);
    });
  }
  return promise;
}
