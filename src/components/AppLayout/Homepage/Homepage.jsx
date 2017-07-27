import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import Article from './Article/Article';
import { fetchArticle } from '../../../tools/firebase';

import firebase from 'firebase';
import 'firebase/app';

class Homepage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    fetchArticle(this.onGetArticle);
  }

  onGetArticle = (snapshot) => {
    console.log(snapshot.val());
    let articles = this.state.articles;
    articles.push(snapshot.val());
    this.setState({
      articles: articles
    });
  }

  render() {
    let articles = [1, 2, 3, 4, 5];
    return (
      <div>
        <CategoryMenu/>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          { this.state.articles.map((article, index) =>
            <Article key={index} article={article}/>
          )}
        </div>
      </div>
    )
  }
}

export default Homepage;
