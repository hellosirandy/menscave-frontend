import React, { Component } from 'react';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import ArticleCard from './ArticleCard/ArticleCard';
import { fetchArticle } from '../../../../tools/firebase';
import { Spin } from 'antd';

class Homepage extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      previews: [],
      loading: true
    }
  }

  componentDidMount() {
    fetchArticle(this.state.category).then(res => {
      this.onPreviewChange(res);
    });

  }

  onPreviewChange = (snapshot) => {
    let previews = [];
    for (let previewKey in snapshot.val()) {
      const s = snapshot.val()[previewKey];
      previews.push({
        key: s.articleKey,
        createTime: s.createTime,
      });
    };
    previews.sort(function(a, b) {return b.createTime - a.createTime});
    this.setState({
      previews: previews,
      loading: false
    });
  }

  updateCategory = (category) => {
    this.setState({
      category: category,
      loading: true,
      previews: [],
    });
    fetchArticle(category).then(res => {
      this.onPreviewChange(res);
    });
  }

  render() {
    const { loading, previews, category } = this.state;
    const spin = loading ? ( <div style={{ textAlign: 'center' }}><Spin/></div> ) : null;
    return (
      <div>
        <CategoryMenu
          updateCategory={this.updateCategory}
          category={category}
        />
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {spin}
          { previews.length > 0 && previews.map((preview, index) =>
            <ArticleCard
              key={index}
              articleKey={preview.key}
              l = {previews.length}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Homepage;
