import React, { Component } from 'react';
import { Select, Input, Row, Col, Button, Form } from 'antd';
import DynamicInputField from './DynamicInputField/DynamicInputField';
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

class EditArticlePage extends Component {
  constructor(props) {
    super(props)
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError, getFieldValue } = this.props.form;
    return (
      <Form onSubmit={this.onSubmit}>
        <Row gutter={20} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <FormItem label="Title" >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title!' }],
                validateTrigger: ['onChange', 'onBlur']
              })(

                <Input size="large" placeholder="Input article title" onBlur={() => {console.log(isFieldTouched('title'));}} />
              )}
            </FormItem>

          </Col>
          <Col span={12}>
            <FormItem label="Category">
              {getFieldDecorator('category', {
                rules: [{ required: true, message: 'Please select a category!' }],
              })(
                <Select
                  placeholder="Select a category"
                  onChange={this.handleSelectChange}
                >
                  <Option value="basketball">Basketball</Option>
                  <Option value="baseball">Baseball</Option>
                  <Option value="sneakers">Sneakers</Option>
                </Select>
              )}
            </FormItem>

          </Col>
        </Row>
        <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
        <DynamicInputField form={this.props.form}/>

        <hr style={{ marginBottom: 24, borderColor: 'white' }}/>
        <Row style={{ marginBottom: 24 }}>
          <Col span={24}>
            <Button type="primary" icon="save" size="large"
              style={{ float: 'right' }}
              htmlType="submit">
               Save
            </Button>

          </Col>
        </Row>
      </Form>
    )
  }
}

export default EditArticlePage;
