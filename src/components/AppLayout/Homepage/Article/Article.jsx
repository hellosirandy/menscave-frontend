import React, { Component } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import { Route } from 'react-router-dom';

class Article extends Component {
  generateTime = () => {
    const time = new Date(this.props.article.updateTime);
    return `${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}`;
  }
  render() {
    return(
      <Route render={({ history }) => (
        <Card
          loading={false}
          title={this.props.article.title}
          extra={<span>{this.generateTime()}</span>}
          style={{ width: '100%', cursor: 'pointer', marginBottom: 24 }}
          onClick={() => { history.push(`/article/${this.props.articleKey}`) }}
          >
          <Row gutter={30}>
            <Col span={12}>
              <p style={{ fontSize: 16}}>{this.props.article.paragraphs[0].english}</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: 16}}>{this.props.article.paragraphs[0].chinese}</p>
            </Col>
          </Row>
          <br/>
          <hr/>
          <br/>
          <div style={{ float: 'right', fontSize: 16 }}>
            <Icon type="message" /> 32
          </div>
        </Card>
      )} />

    )
  }
}

export default Article;
