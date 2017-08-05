import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';

class Paragraph extends Component {
  render() {
    const { paragraph } = this.props;
    const textParagraph = paragraph.type === 'text' ? (
      <Row gutter={12}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
          <p style={{ fontSize: '1rem'}}> {paragraph.content.english} </p>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <p style={{ fontSize: '1rem'}}> {paragraph.content.chinese} </p>
        </Col>
      </Row>
    ) : null;
    const imageParagraph = paragraph.type === 'image' ? (
      <Row>
        <Col span={24}>
          <div style={{ width: '100%' }}>
            <Spin spinning={false}>
              <img src={paragraph.content.url} alt="" style={{ width: '100%' }}/>
            </Spin>
          </div>
        </Col>
      </Row>
    ) : null;
    return (
      <div style={{ margin: '12px 0', padding: '12px 0', borderBottom: '1.5px dashed #f5cd47' }}>
        {paragraph.type === 'text' ? textParagraph : imageParagraph}
      </div>
    );
  }
}

export default Paragraph;
