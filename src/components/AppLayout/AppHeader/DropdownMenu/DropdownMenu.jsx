import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

export default class DropdownMenu extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
      </Menu>
    )
  }
};
