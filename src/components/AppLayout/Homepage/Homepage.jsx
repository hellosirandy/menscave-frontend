import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import Article from './Article/Article';
import { databaseRef } from '../../../tools/firebase';
import { Spin } from 'antd';

class Homepage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      category: 'latest',
      articles: [],
      loading: true
    }
  }

  componentDidMount() {
    databaseRef.child('articles').on('value', this.onArticleChange);
  }

  onArticleChange = (snapshot) => {
    let articles = this.state.articles;
    for (let articleKey in snapshot.val()) {
      articles.push(snapshot.val()[articleKey]);
    };
    this.setState({
      articles: articles,
      loading: false
    });
  }

  updateCategory = (category) => {
    this.setState({
      category: category,
      loading: true
    });
    databaseRef.child('articles').off('value', this.onArticleChange);
    this.setState({
      articles: []
    });
    if (category === 'latest') {
      databaseRef.child('articles').on('value', this.onArticleChange);
    } else {
      databaseRef.child('articles').orderByChild('category').equalTo(category).on('value', this.onArticleChange);
    }
  }

  // const articles

  render() {
    const spin = this.state.loading ? ( <div style={{ textAlign: 'center' }}><Spin/></div> ) : null;
    return (
      <div>
        <CategoryMenu
          updateCategory={this.updateCategory}
          category={this.state.category}
        />
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {spin}
          { this.state.articles.map((article, index) =>
            <Article
              key={index}
              article={article}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Homepage;
