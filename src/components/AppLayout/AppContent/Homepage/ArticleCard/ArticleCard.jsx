import React, { Component } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import { Route } from 'react-router-dom';

class ArticleCard extends Component {
  render() {
    const { article } = this.props;
    return(
      <Route render={({ history }) => (
        <Card
          loading={false}
          title={article.title}
          extra={<span>{article.formatDate()}</span>}
          style={{ width: '100%', cursor: 'pointer', marginBottom: 24 }}
          onClick={() => { history.push(`/article/${this.props.articleKey}`) }}
          >
          <Row gutter={30}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 16}}>{article.paragraphs[0].english}</p>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 16}}>{article.paragraphs[0].chinese}</p>
            </Col>
          </Row>
          <br/>
          <hr/>
          <br/>
          <div style={{ float: 'right', fontSize: 16 }}>
            <Icon type="message" /> { article.comments ? Object.keys(article.comments).length: 0 }
          </div>
        </Card>
      )} />

    )
  }
}

export default ArticleCard;
