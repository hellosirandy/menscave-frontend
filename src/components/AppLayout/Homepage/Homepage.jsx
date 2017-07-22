import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import Article from './Article/Article';
import firebase from 'firebase/app';
import 'firebase/database';

class Homepage extends Component  {
  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyB3ZbI_u_TywJCbNz1sMp5-d6bVVldSovc",
      authDomain: "menscave-620ba.firebaseapp.com",
      databaseURL: "https://menscave-620ba.firebaseio.com",
      projectId: "menscave-620ba",
      storageBucket: "menscave-620ba.appspot.com",
      messagingSenderId: "1047834325271"
    };

    // this.app = firebase.initializeApp(config);
    // this.database = this.app.database();
    // this.databaseRef = this.database.ref().child();
  }
  render() {
    let articles = [1, 2, 3, 4, 5];
    return (
      <div>
        <CategoryMenu/>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          { articles.map((article, index) =>
            <Article key={index}/>
          )}
        </div>
      </div>
    )
  }
}

export default Homepage;
