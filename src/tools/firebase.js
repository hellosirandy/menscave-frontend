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

export function saveArticle(article):Promise<resolve, reject> {
  const promise = databaseRef.child('articles').push().set(article, function(err) {
    if (!err) {
      return Promise.resolve('OK');
    } else {
      return Promise.reject(err);
    }
  });
  return promise;
}

export function fetchArticle(category):Promise<resolve> {
  let promise;
  if (category === 'latest') {
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
