import React, { Component } from 'react';
import { Row, Col } from 'antd';
import ImageWall from './ImageWall/ImageWall';

class Paragraph extends Component {
  render() {
    const { paragraph } = this.props;
    const splitTextParagraph = paragraph.type === 'split' ? (
      <Row gutter={12}>
        <Col xs={{ span: 24 }} sm={{ span: 12 }} style={{ marginBottom: 12 }}>
          <p style={{ fontSize: '1rem'}}>{paragraph.content.english}</p>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 12 }}>
          <p style={{ fontSize: '1rem'}}>{paragraph.content.chinese}</p>
        </Col>
      </Row>
    ) : null;

    const singleTextParagraph = paragraph.type === 'single' ? (
      <Row>
        <Col span={24} style={{ marginBottom: 12 }}>
          <p style={{ fontSize: '1rem' }}>{paragraph.content}</p>
        </Col>
      </Row>
    ): null

    const imageParagraph = paragraph.type === 'image' ? (
      <ImageWall url={paragraph.content.url} />
    ) : null;
    return (
      <div style={{ margin: '12px 0', padding: '12px 0', borderBottom: '1.5px dashed #f5cd47' }}>
        {paragraph.type === 'split' ? splitTextParagraph : (paragraph.type === 'single' ? singleTextParagraph : imageParagraph)}
      </div>
    );
  }
}

export default Paragraph;
