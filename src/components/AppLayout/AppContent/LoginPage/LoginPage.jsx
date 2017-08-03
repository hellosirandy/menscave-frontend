import React, { Component } from 'react';
import { Form } from 'antd';
import LoginForm from './LoginForm/LoginForm';

export default class LoginPage extends Component {
  render () {
    const Login = Form.create()(LoginForm)
    return(
      <div style={{ backgroundColor: 'white', width: '400px', padding: 20, margin: 'auto', marginTop: 100 }}>
        <Login/>
      </div>
    )
  }
}
