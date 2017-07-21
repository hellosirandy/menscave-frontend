import React, { Component } from 'react';
import { Card, Icon, Row, Col } from 'antd';
import { Route } from 'react-router-dom';

class Article extends Component {
  render() {
    return(
      <Route render={({ history}) => (
        <Card
          loading={false}
          title="蜈蚣球兒"
          extra={<span>07/21 17:22</span>}
          style={{ width: '100%', cursor: 'pointer', marginBottom: 24 }}
          onClick={() => { history.push('/article/123') }}
          >
          <Row gutter={30}>
            <Col span={12}>
              <p style={{ fontSize: 16}}>Ahead of today's Summer League semifinals, Lonzo Ball told ESPN's Cassidy Hubbarth that he planned on playing Air Jordan 31s. Moments later, he took the court wearing the "Black and Sheen" Air Jordan 31 Low.</p>
            </Col>
            <Col span={12}>
              <p style={{ fontSize: 16}}>在今天的夏日聯盟準決賽賽前，球兒告訴ESPN的記者卡西迪·乎芭絲說他打算要穿著喬丹31帶上場。果了一會兒，他就穿著”閃耀黑”喬丹31帶低筒上場。</p>
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
