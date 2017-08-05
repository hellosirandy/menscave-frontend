import React, { Component } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import ImageWall from './ImageWall/ImageWall';
const FormItem = Form.Item;
const { TextArea } = Input;

class Paragraph extends Component {

  render() {
    const { form, paragraphNum, paragraph, removeParagraph } = this.props;
    const { getFieldDecorator } = form;
    const textInput = (
      <div>
        <Row gutter={20} style={{ height: 'auto' }}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem label="English" style={{ marginBottom: 0 }}>
              {getFieldDecorator(`paragraphs[${paragraph.key}].english`, {
                initialValue: paragraph.english
              })(
                <TextArea rows={5}
                  style={{ resize: 'none' }}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem label="Chinese" style={{ marginBottom: 0 }}>
              {getFieldDecorator(`paragraphs[${paragraph.key}].chinese`, {
                initialValue: paragraph.chinese
              })(
                <TextArea rows={5}
                  style={{ resize: 'none' }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    )
    const imageInput = (
      <ImageWall></ImageWall>
    )
    return (
      <div style={{ marginBottom: 24 }}>
        <Row style={{ height: 40, borderBottom: '1px dashed #cfcfcf' }}>
          <Col span={12}>
            <h3 style={{ lineHeight: '40px' }} >Paragraph {paragraphNum}</h3>
          </Col>
          <Col span={12}>
            <Button type="danger" shape="circle" icon="minus" size="small"
              style={{ float: 'right', marginTop: 9 }}
              onClick={() => removeParagraph(paragraph.key)}
            />
          </Col>
        </Row>
        {paragraph.type === 'text' && textInput}
        {paragraph.type === 'image' && imageInput}
      </div>

    )
  }
}

export default Paragraph;
