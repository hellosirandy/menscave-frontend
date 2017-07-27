import React, { Component } from 'react';
import { Row, Col } from 'antd';

class Paragraph extends Component {
  render() {
    return (
      <div style={{ margin: '12px 0', padding: '12px 0', borderBottom: '1.5px dashed rgb(245, 205, 71)' }}>
        <Row gutter={16}>
          <Col span={12}>
            <p style={{ fontSize: '1rem'}}>
              {this.props.paragraph.english}
            </p>
          </Col>
          <Col span={12}>
            <p style={{ fontSize: '1rem'}}>
              {this.props.paragraph.chinese}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Paragraph;
