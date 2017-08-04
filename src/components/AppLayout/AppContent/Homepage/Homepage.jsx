import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import ArticleCard from './ArticleCard/ArticleCard';
import { fetchArticle } from '../../../../tools/firebase';
import { Spin } from 'antd';
import { Article } from '../../../../models/article';

class Homepage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      articles: [],
      loading: true
    }
  }

  componentDidMount() {
    fetchArticle(this.state.category).then(res => {
      this.onArticleChange(res);
    });
    
  }

  onArticleChange = (snapshot) => {
    let articles = [];
    for (let articleKey in snapshot.val()) {
      const s = snapshot.val()[articleKey];
      articles.push({
        key: articleKey,
        value: new Article(s.title, s.updateTime, s.category, s.comments, s.paragraphs)
      });
    };
    articles = articles.reverse();
    this.setState({
      articles: articles,
      loading: false
    });
  }

  updateCategory = (category) => {
    this.setState({
      category: category,
      loading: true,
      articles: [],
    });
    fetchArticle(category).then(res => {
      this.onArticleChange(res);
    });
  }

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
            <ArticleCard
              key={index}
              articleKey={article.key}
              article={article.value}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Homepage;
