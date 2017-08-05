import React, { Component } from 'react';
import { Row, Col, Input, Button, Form, Select } from 'antd';
import ImageWall from './ImageWall/ImageWall';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class Paragraph extends Component {
  render() {
    const { form, paragraphNum, paragraph, removeParagraph } = this.props;
    const { getFieldDecorator } = form;
    const textInput = paragraph.type === 'text' ? (
      <div>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator(`paragraphs[${paragraph.key}].type`, {
            initialValue: paragraph.type
          })(
            <Input/>
          )}
        </FormItem>
        <Row gutter={20} style={{ height: 'auto' }}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem label="English" style={{ marginBottom: 0 }}>
              {getFieldDecorator(`paragraphs[${paragraph.key}].content.english`, {
                initialValue: paragraph.content.english
              })(
                <TextArea rows={5}
                  style={{ resize: 'none' }}
                />
              )}
            </FormItem>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <FormItem label="Chinese" style={{ marginBottom: 0 }}>
              {getFieldDecorator(`paragraphs[${paragraph.key}].content.chinese`, {
                initialValue: paragraph.content.chinese
              })(
                <TextArea rows={5}
                  style={{ resize: 'none' }}
                />
              )}
            </FormItem>
          </Col>
        </Row>
      </div>
    ) : null;
    const imageInput = paragraph.type === 'image' ? (
      <div>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator(`paragraphs[${paragraph.key}].type`, {
            initialValue: paragraph.type
          })(
            <Input/>
          )}
        </FormItem>
        <ImageWall fileUploaded={(url) => {
          form.setFieldsValue({
            [`paragraphs[${paragraph.key}].content.url`]: url
          })
        }}/>
        <FormItem style={{ display: 'none' }}>
          {getFieldDecorator(`paragraphs[${paragraph.key}].content.url`, {
            initialValue: paragraph.content.url
          })(
            <Input/>
          )}
        </FormItem>
      </div>
    ) : null;
    return (
      <div style={{ marginBottom: 24 }}>
        <Row style={{ height: 40, borderBottom: '1px dashed #cfcfcf' }}>
          <Col span={18}>
            <h3 style={{ lineHeight: '40px' }} >Paragraph {paragraphNum}</h3>
          </Col>
          <Col span={6}>
            <Button type="danger" shape="circle" icon="minus" size="small"
              style={{ float: 'right', marginTop: 9 }}
              onClick={() => removeParagraph(paragraph.key)}
            />
          </Col>
        </Row>
        {paragraph.type === 'text' ? textInput : imageInput}
      </div>

    )
  }
}

export default Paragraph;
