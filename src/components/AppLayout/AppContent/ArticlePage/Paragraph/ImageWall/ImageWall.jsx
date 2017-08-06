import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

export default class ImageWall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }
  render() {
    return (
      <Row>
        <Col span={24}>
          <div style={{ width: '100%' }}>
            <Spin spinning={this.state.loading}>
              <img src={this.props.url} alt="" style={{ width: '100%' }}
                onLoad={() => {this.setState({ loading: false })}}/>
            </Spin>
          </div>
        </Col>
      </Row>
    )
  }
};
