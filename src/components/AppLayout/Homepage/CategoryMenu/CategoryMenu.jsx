import React, { Component } from 'react';
import { Menu } from 'antd';

class CategoryMenu extends Component {
  constructor() {
    super();
    this.state = {
      current: 'new',
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return(
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="light"
      >
        <Menu.Item key="new">
          New
        </Menu.Item>
        <Menu.Item key="basketball">
          Basketball
        </Menu.Item>
        <Menu.Item key="baseball">
          Baseball
        </Menu.Item>
        <Menu.Item key="sneakers">
          Sneakers
        </Menu.Item>
      </Menu>
    )
  }
}

export default CategoryMenu;
