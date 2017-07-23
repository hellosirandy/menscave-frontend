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
    this.saveArticle = this.saveArticle.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  saveArticle(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      } else {
        console.log(err);
      }
    });
  }

  render() {
    const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
    const titleError = isFieldTouched('title') && getFieldError('title');
    return (
      <Form onSubmit={this.saveArticle}>
        <Row gutter={20} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <FormItem label="Title"
              validateStatus={ titleError ? 'error' : ''}
              help={ titleError || '' }>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please input the title!' }],
              })(
                <Input size="large" placeholder="Input article title" />
              )}
            </FormItem>

          </Col>
          <Col span={12}>
            <FormItem label="Category"
              validateStatus={ '' }
              help={ false }>
              {getFieldDecorator('gender', {
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
        <DynamicInputField/>

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
