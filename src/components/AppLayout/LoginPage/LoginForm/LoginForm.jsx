import React, { Component } from 'react';
import { Form, Input, Row, Button } from 'antd';
const FormItem = Form.Item;

export default class LoginForm extends Component {
  onSubmit =(e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      } else {
        console.log(err);
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.onSubmit}>
        <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username' }],
          })(
            <Input size="large" placeholder="Username"/>
          )}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password' }],
          })(
            <Input size="large" placeholder="Password"/>
          )}
        </FormItem>
        <Row>
          <Button htmlType="submit" type="primary" style={{ float: 'right' }}>Login</Button>

        </Row>
      </Form>
    )
  }
}
