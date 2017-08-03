import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
export default class DropdownMenu extends Component {
  handleMenuClick = (e) => {
    if (e.key === '1') {
      this.props.showModal();
    }
  }
  render() {
    const menu = (
      <Menu onClick={ this.handleMenuClick }>
        <Menu.Item key="1" >Login</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Button icon="user" shape="circle" type="dashed"
          style={{ backgroundColor: 'transparent' }}
          ghost
        />
      </Dropdown>
    )
  }
};
