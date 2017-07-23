import firebase from 'firebase';
import 'firebase/app';

let config = {
  apiKey: "AIzaSyB3ZbI_u_TywJCbNz1sMp5-d6bVVldSovc",
  authDomain: "menscave-620ba.firebaseapp.com",
  databaseURL: "https://menscave-620ba.firebaseio.com",
  projectId: "menscave-620ba",
  storageBucket: "menscave-620ba.appspot.com",
  messagingSenderId: "1047834325271"
}

//the root app just in case we need it
const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database();
const databaseRef = database.ref();

export function saveArticle(article) {
  databaseRef.child('articles').push().set(article);
}
