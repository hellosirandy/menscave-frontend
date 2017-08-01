import React, { Component } from 'react';
import Logo from './logo.png';
import { Route, Link } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import './AppHeader.css';

class AppHeader extends Component {
  handleMenuClick = (e) => {
    console.log(e);
  }
  render() {

    const menu = (
      <Menu>
        <Menu.Item key="1"><Link to='/login'>Login</Link></Menu.Item>
      </Menu>
    );
    return(
      <div className="layout-header">
        <div style={{ width: 40, height: 40, margin: '12px 24px 12px 0', float: 'left' }}>
          <Route
            render={({ history }) => (
              <img
                src={Logo} alt="Logo"
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {history.push('/home')}}/>
          )}/>
        </div>
        <div style={{ float: 'right' }}>
          <Route
            render={({ history }) => (
              <Button type="dashed" shape="circle" icon="plus"
                style={{ backgroundColor: 'transparent', marginRight: 12 }}
                ghost
                onClick={() => {history.push('/admin/newarticle')}}/>
            )}
          />
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Button icon="user" shape="circle" type="dashed"
              style={{ backgroundColor: 'transparent' }}
              ghost
            />
          </Dropdown>
        </div>


      </div>

    )
  }
}

export default AppHeader;
