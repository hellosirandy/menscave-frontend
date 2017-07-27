import React, { Component } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class Paragraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
    return (
      <div style={{ marginBottom: 48 }}>
        <Row style={{ height: 40, borderBottom: '1px dashed #cfcfcf' }}>
          <Col span={12}>
            <h3 style={{ lineHeight: '40px' }} >Paragraph {this.props.paragraphNum}</h3>
          </Col>
          <Col span={12}>
            <Button type="danger" shape="circle" icon="minus" size="small"
              style={{ float: 'right', marginTop: 9 }}
              onClick={() => this.props.removeParagraph(this.props.paragraph.key)}
            />
          </Col>
        </Row>
        <Row gutter={20} style={{ height: 'auto' }}>
          <Col span={12}>
            <FormItem label="English">
              {getFieldDecorator(`paragraphs[${this.props.paragraphNum-1}].english`, {
                initialValue: this.props.paragraph.english
              })(
                <Input type="textarea" rows={5}
                  style={{ resize: 'none' }}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Chinese">
              {getFieldDecorator(`paragraphs[${this.props.paragraphNum-1}].chinese`, {
                initialValue: this.props.paragraph.chinese
              })(
                <Input type="textarea" rows={5}
                  style={{ resize: 'none' }}/>
              )}
            </FormItem>

          </Col>
        </Row>
      </div>

    )
  }
}

export default Paragraph;
