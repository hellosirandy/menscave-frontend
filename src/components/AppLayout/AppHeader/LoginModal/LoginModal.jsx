import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { auth } from '../../../../tools/firebase';
const FormItem = Form.Item;

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }
  }
  onLogin = () => {
    this.setState({ loading: true });
    const { form, onCancel } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        auth.signInWithEmailAndPassword(values.username, values.password).then(user => {
          this.setState({ loading: false });
          onCancel();
          message.success('You are now logged in', 3);
        }).catch(err => {
          this.setState({ loading: false });
          if (err.code === 'auth/wrong-password') {
            form.setFields({
              password: {
                errors: [new Error(err.message)],
              },
            });
          } else if (err.code === 'auth/user-not-found') {
            form.setFields({
              username: {
                errors: [new Error(err.message)],
              },
            });
          }
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  render() {
    const { visible, onCancel, form } = this.props;
    const { getFieldDecorator } = form;
    const loginForm = (
      <Form layout="vertical">
        <FormItem label="Username">
          {getFieldDecorator('username', {
            rules: [{
              type: 'email', message: 'Please input a valid E-mail as username',
            }, {
              required: true, message: 'Please input username',
            }],
            validateTrigger: ['onBlur'],
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
        onOk={this.onLogin}
        confirmLoading={this.state.loading}
      >
        {loginForm}
      </Modal>
    );
  }
}
export default LoginModal;
