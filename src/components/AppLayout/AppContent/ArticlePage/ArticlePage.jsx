import React, { Component } from 'react';
import { databaseRef } from '../../../../tools/firebase';
import { Spin } from 'antd';
import Paragraph from './Paragraph/Paragraph';
import Comment from './Comment/Comment';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      loading: true,
    }
  }
  componentDidMount() {
    databaseRef.child('articles').orderByKey().equalTo(this.props.match.params.article).once('value', snapshot => {
      this.setState({
        article: snapshot.val()[this.props.match.params.article],
        loading: false,
      });
    });
  }
  render() {
    const spin = this.state.loading ? (<div style={{ textAlign: 'center' }}><Spin/></div>) : null;
    const paragraphs = this.state.article.paragraphs ? this.state.article.paragraphs : [];
    return(
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {spin}
        <h3 style={{ fontSize: '2.2rem'}}>{ this.state.article.title} </h3>
        <div style={{ marginBottom: '36px' }}>
          { paragraphs.map((p, index) =>
            <Paragraph
              key={index}
              paragraph={p}
            />
          )}
        </div>
        <Comment articleKey={this.props.match.params.article}/>
      </div>
    )
  }
}

export default ArticlePage;
