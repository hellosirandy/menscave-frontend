import React, { Component } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import { Route } from 'react-router-dom';
import { databaseRef } from '../../../../../tools/firebase';
import { Article } from '../../../../../models/article';

class ArticleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      article: {},
    }
  }
  componentDidMount() {
    databaseRef.child(`articles/${this.props.articleKey}`).once('value', snapshot => {
      const val = snapshot.val();
      const article = new Article(val.title, val.updateTime, val.createTime, val.category, val.comments, val.paragraphs);
      this.setState({ article: article, loading: false });
    });
  }
  render() {
    const { article, loading } = this.state;
    return(
      <Route render={({ history }) => (
        <Card
          loading={loading}
          title={article.title}
          extra={<span>{loading ? '' : article.formatDate()}</span>}
          style={{ width: '100%', cursor: 'pointer', marginBottom: 24 }}
          onClick={() => { history.push(`/article/${this.props.articleKey}`) }}
          >
          {!loading &&
            <div>
              <Row gutter={30}>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 16}}>{article.paragraphs[0].content.english}</p>
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 16}}>{article.paragraphs[0].content.chinese}</p>
                </Col>
              </Row>
              <br/>
              <hr/>
              <br/>
              <div style={{ float: 'right', fontSize: 16 }}>
                <Icon type="message" /> { article.comments ? Object.keys(article.comments).length: 0 }
              </div>
            </div>

          }

        </Card>
      )} />

    )
  }
}

export default ArticleCard;
