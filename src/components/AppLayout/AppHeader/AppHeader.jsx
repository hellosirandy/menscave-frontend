import React, { Component } from 'react';
import Logo from './logo.png';
import { Route, Link } from 'react-router-dom';
import { Button, Menu, Dropdown } from 'antd';
import './AppHeader.css';
import Responsive from 'react-responsive';

class AppHeader extends Component {
  render() {
    const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
    const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={992} children={children} />;
    const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
    const menu = (
      <Menu>
        <Menu.Item key="1"><Link to='/login'>Login</Link></Menu.Item>
      </Menu>
    );
    const content = (
      <div>
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
    return(
      <div>
        <Desktop>
          <div style={{ width: '70%', margin: 'auto', maxWidth: '1000px'}}>
            {content}
          </div>
        </Desktop>
        <Tablet>
          <div style={{ width: '85%', margin: 'auto' }}>
            {content}
          </div>
        </Tablet>
        <Mobile>
          <div style={{ width: '100%', padding: '0 12px'}}>
            {content}
          </div>
        </Mobile>
      </div>

    )
  }
}

export default AppHeader;
