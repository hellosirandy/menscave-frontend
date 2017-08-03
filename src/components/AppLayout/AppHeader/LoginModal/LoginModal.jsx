import React from 'react';
import { Modal, Form, Input, } from 'antd';
const FormItem = Form.Item;

export const LoginModal = Form.create()(
  (props) => {
    const { visible, onCancel, onLogin, form } = props;
    const { getFieldDecorator } = form;
    const loginForm = (
      <Form layout="vertical">
        <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username.' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password.' }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
      </Form>
    )
    return (
      <Modal
        visible={visible}
        title="Login"
        okText="Login"
        cancelText="cancel"
        onCancel={onCancel}
        onOk={onLogin}
        confirmLoading={false}
      >
        {loginForm}
      </Modal>
    );
  }
);
