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
      <div>
        <Row>
          <Col span={12}>
            <h3 style={{ marginBottom: 10 }}>Paragraph {this.props.paragraphNum}</h3>
          </Col>
          <Col span={12}>
            <Button type="danger" shape="circle" icon="minus" size="small"
              style={{ float: 'right' }}
              onClick={() => this.props.removeParagraph(this.props.paragraph.key)}
            />
          </Col>
        </Row>
        <Row gutter={20} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <FormItem label="English">
              {getFieldDecorator(`paragraph-english-${this.props.paragraphNum}`, {
                initialValue: this.props.paragraph.english
              })(
                <TextArea rows={5}
                  style={{ resize: 'none' }}/>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Chinese">
              {getFieldDecorator(`paragraph-chinese-${this.props.paragraphNum}`, {
                initialValue: this.props.paragraph.chinese
              })(
                <TextArea rows={5}
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
