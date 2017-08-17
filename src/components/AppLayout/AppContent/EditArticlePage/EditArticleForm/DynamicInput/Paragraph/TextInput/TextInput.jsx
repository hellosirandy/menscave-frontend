import React, { Component } from 'react';
import { Form, Row, Col, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const Single = ({ props }) => {
  const { form, paragraph } = props;
  const { getFieldDecorator } = form;
  return (
    <Row gutter={20} >
      <Col xs={{span: 24 }} sm={{ span: 12 }}>
        <FormItem label="English" style={{ marginBottom: 0 }}>
          {getFieldDecorator(`paragraphs-${paragraph.key}.content.english`, {
            initialValue: paragraph.content.english
          })(
            <TextArea rows={5}
              style={{ resize: 'none' }}
            />
          )}
        </FormItem>
      </Col>
      <Col xs={{span: 24 }} sm={{ span: 12 }}>
        <FormItem label="中文" style={{ marginBottom: 0 }}>
          {getFieldDecorator(`paragraphs-${paragraph.key}.content.chinese`, {
            initialValue: paragraph.content.chinese
          })(
            <TextArea rows={5}
              style={{ resize: 'none' }}
            />
          )}
        </FormItem>
      </Col>
    </Row>
  )
}

const Split = ({ props }) => {
  const { form, paragraph } = props;
  const { getFieldDecorator } = form;
  return (
    <Row>
      <Col span={24}>
        <FormItem style={{ marginBottom: 0 }}>
          {getFieldDecorator(`paragraphs-${paragraph.key}.content`, {
            initialValue: paragraph.content
          })(
            <TextArea rows={5}
              style={{ resize: 'none' }}
            />
          )}
        </FormItem>
      </Col>
    </Row>
  )
}

export default class TextInput extends Component {
  render() {
    const { form, paragraph } = this.props;
    const { getFieldDecorator } = form;
    const inputField = paragraph.type === 'single' ? (<Split props={this.props}/>) : (<Single props={this.props}/>);
    getFieldDecorator(`paragraphs-${paragraph.key}.type`, { initialValue: paragraph.type });
    return (
      <div>
        { inputField }
      </div>
    )
  }
};
