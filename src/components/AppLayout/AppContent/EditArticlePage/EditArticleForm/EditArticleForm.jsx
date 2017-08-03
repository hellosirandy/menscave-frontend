import React, { Component } from 'react';
import { Select, Input, Row, Col, Button, Form, message } from 'antd';
import DynamicInputField from './DynamicInputField/DynamicInputField';
import { saveArticle } from '../../../../../tools/firebase';
import { Route } from 'react-router-dom';
const Option = Select.Option;
const FormItem = Form.Item;

class EditArticleForm extends Component {
  onSubmit = (history, e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const paragraphs = values.paragraphs.filter(paragraph => {
          return paragraph;
        });
        values.paragraphs = paragraphs;
        values['updateTime'] = new Date().toString();
        saveArticle(values).then((res) => {
          message.success('The article has been saved.', 3);
          history.push('/home');
        }).catch((res) => {
          console.log(res);
        });
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Route
        render={({ history }) => (
          <Form onSubmit={this.onSubmit.bind(this, history)}>
            <Row gutter={20} style={{ marginBottom: 24 }}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <FormItem label="Title" >
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title!' }],
                    validateTrigger: ['onChange', 'onBlur']
                  })(
                    <Input size="large" placeholder="Input article title"/>
                  )}
                </FormItem>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <FormItem label="Category">
                  {getFieldDecorator('category', {
                    rules: [{ required: true, message: 'Please select a category!' }],
                  })(
                    <Select
                      placeholder="Select a category"
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
        )}
      />

    )
  }
}

export default EditArticleForm;
