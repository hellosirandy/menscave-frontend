import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import Article from './Article/Article';

class Homepage extends Component  {
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
