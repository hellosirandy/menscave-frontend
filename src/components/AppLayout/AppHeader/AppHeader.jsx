import React, { Component } from 'react';
import Logo from './logo.png';
import { Route, Link } from 'react-router-dom';
import { Button, Menu, Dropdown, Icon } from 'antd';

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
      <div style={{ width: '70%', margin: 'auto', maxWidth: '1000px' }}>
        <div style={{ width: 40, height: 40, margin: '12px 24px 12px 0', float: 'left' }}>
          <Route
            render={({ history }) => (
              <img
                src={Logo} alt="Logo"
                style={{ width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {history.push('/home')}}/>
          )}/>
        </div>
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Button icon="user" shape="circle"
            style={{ backgroundColor: 'transparent', float: 'right', marginTop: 18 }}
            ghost
          />
        </Dropdown>

      </div>

    )
  }
}

export default AppHeader;
